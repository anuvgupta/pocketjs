<?php
class Pocket {
    //instance fields
    protected $n; //name of server
    protected $s; //master socket
    protected $d; //server domain
    protected $p; //server port
    protected $c; //client array
    protected $mc; //max clients
    protected $on; //event listeners
    protected $am; //data to send to all clients
    protected $cm; //data to send to individual clients
    protected $v; //verbose run
    //constructor method called when new Pocket constructed
    public function __construct($d, $p, $mc, $v = null) {
        $this->d = $d ?: 'localhost';
        $this->p = $p ?: 30000;
        $this->c = array();
        $this->mc = $mc ?: 25;
        $this->on = array();
        $this->am = array();
        $this->cm = array();
        $this->v = true;
        $this->n = 'LOCAL';
        $this->bind('__open', function ($id) { });
        $this->bind('__run', function () { });
        $this->bind('__close', function ($id) { });
        if (is_string($v)) $this->n = strtoupper($v);
        else $this->v = ($v !== null) ? $v : true;
        if ($this->v) echo PHP_EOL . "\e[1m{$this->n} POCKET SERVER" . PHP_EOL;
        if (!($this->s = socket_create(AF_INET, SOCK_STREAM, 0))) //create blank websocket
            die ('[ERROR] socket_create(' . AF_INET . ', ' . SOCK_STREAM . ', 0): fail - [' . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
        if ($this->v) echo '[SERVER] pocket created' . PHP_EOL;
    }
    //destructor method called before destroying Pocket object
    public function __destruct() {
        $this->close(); //close all sockets
    }
    //function open called to start socket server
    public function open() {
        if (!(socket_bind($this->s, $this->d, $this->p))) //bind socket to domain and port
            die ("[ERROR] socket_bind(\$this->s, $this->d, $this->p): fail - [" . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
        if (!(socket_listen($this->s, $this->mc))) //commence listening for clients
            die ("[ERROR] socket_listen(\$this->s, $this->mc): fail - [" . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
        if ($this->v) {
            echo "[SERVER] pocket listening on $this->d:$this->p" . PHP_EOL;
            echo '[SERVER] waiting for connections';
            echo "..\e[5m.\e[25m" . PHP_EOL . PHP_EOL;
        }
        while (true) { //start server
            $read = array(); //array of sockets to be read
            $read[0] = $this->s; //first socket to be read = master socket
            //add existing (online) clients to read array
            for ($i = 0; $i < $this->mc; $i++) {
                if (isset($this->c[$i])) $read[$i + 1] = $this->c[$i];
            }
            //select sockets in read array to be watched for status changes
            if (@socket_select($read , $write , $except , null) === false) //pass in read, null write and except, null timeout (to block (watch for status change) infinitely)
                die ('[ERROR] socket_select($read , $write , $except , null): fail - [' . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
            //FUNCTIONALITY OF socket_select() IN QUESTION: does it remove all socket elements in $read, and later add them back when status change occurs?

            //check if new client is connecting
            if (in_array($this->s, $read)) { //if master socket is in read array, master socket's status has changed, thus a client is connecting
                for ($i = 0; $i < $this->mc; $i++) { //loop through array of clients
                    if (@$this->c[$i] == null) { //if there is space available for a new connection
                        echo PHP_EOL;
                        $this->c[$i] = socket_accept($this->s);//accept the new socket connection from master socket, construct client and add to client array
                        //display connecting client's details
                        if (socket_getpeername($this->c[$i], $addr, $this->pt)) echo "[SERVER] client[$i] $addr : $this->pt connecting" . PHP_EOL;
                        //accept client socket handshake headers
                        $header = socket_read($this->c[$i], 1024); //read data from new client socket: contains handshake headers
                        echo '[SERVER] headers recieved';
                        $headers = array(); //init headers array
                        $lines = preg_split("/\r\n/", $header); //add each line of header to array
                        foreach ($lines as $line) { //for each header
                            $line = chop($line); //remove whitespaces and escape characters
                            if(preg_match('/\A(\S+): (.*)\z/', $line, $matches)) $headers[$matches[1]] = $matches[2]; //split header into title and value, load into associative array
                        }
                        echo ' | ';
                        //generate and send back server socket handshake headers to client socket
                        $accept = base64_encode(pack('H*', sha1($headers['Sec-WebSocket-Key'] . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
                        $upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
                        "Upgrade: websocket\r\n" .
                        "Connection: Upgrade\r\n" .
                        "WebSocket-Origin: " . $this->d . "\r\n" .
                        "WebSocket-Location: ws://" . $this->d . ":" . $this->p . "/server.php\r\n".
                        "Sec-WebSocket-Accept:$accept\r\n\r\n";
                        if (socket_write($this->c[$i], $upgrade, strlen($upgrade)) === false)
                            die ('socket_write: fail - [' . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
                        echo 'headers sent' . PHP_EOL;
                        //display connection details if connection successful
                        if (socket_getpeername($this->c[$i], $addr, $this->pt)) {
                            echo '[SERVER] handshake complete - client connected' . PHP_EOL . PHP_EOL;
                            //send client's data to client
                            $this->data = $this->mask(json_encode(array('id' => $i, 'address' => $addr, 'port' => $this->pt)));
                            socket_write($this->c[$i], $this->data, strlen($this->data));
                            $this->call('__open', false, $i);
                        }
                        break;
                    }
                }
            }

            //calculate client data
            $this->call('__run');

            //send clients data
            for ($j = 0; $j < count($am); $j++) {
                $msg = $am[$j];
                for ($i = 0; $i < $this->mc; $i++) {
                    if ((@$this->c[$i] != null) && isset($this->c[$i])) socket_write($this->c[$i], $msg, strlen($msg));
                }
                unset($am[$j]);
            }
            for ($j = 0; $j < count($am); $j++) {
                $a = $this->cm[$j];
                if ((@$this->c[$a['id']] != null) && isset($this->c[$a['id']])) socket_write($this->c[$a['id']], $a['msg'], strlen($a['msg']));
                else {
                    $e = array_shift(debug_backtrace());
                    echo "[ERROR] client {$a['id']} does not exist ({$e['file']}:{$e['line']})";
                }
                unset($this->cm[$j]);
            }

            //check if client sockets have sent data
            for ($i = 0; $i < $this->mc; $i++) { //loop through client sockets
                if (in_array(@$this->c[$i] , $read)) { //if client socket is defined and is in read array, its status has changed and it is sending data
                    //recieve data from client
                    while (@socket_recv($this->c[$i], $masked_data, 1024, 0) >= 1) { //if client sends new data (0 bytes = disconnected, 1 byte = connected, >1 bytes = new data sent to server)
                        //$data = json_decode(escapeshellcmd($this->unmask($masked_data)), true);
                        $data = json_decode($this->unmask($masked_data), true);
                        if (!isset($data['call'])) {
                            $this->close($i);
                            echo "[SERVER] client[$i] kicked for: sending illegal data" . PHP_EOL;
                        } elseif (in_array($data['call'], $this->on)) {
                            print_r($this->on);
                            if (isset($data['args'])) $this->call($data['call'], true, $data['args']);
                            else $this->call($data['call']);
                        }
                        // else {
                        //     $args = '';
                        //     if (isset($this->data['args'])) {
                        //         for ($j = 0; $j < count($this->data['args']); $j++) $args .= ', ' . escapeshellcmd($this->data['args'][$j]);
                        //     }
                        //     echo "[SERVER] message from client[$i]: " . escapeshellcmd($this->data['call']) . $args . PHP_EOL;
                        // }
                        break 2;
                    }
                    //check if client has disconnected
                    $input = @socket_read($this->c[$i], 1024, PHP_NORMAL_READ); //read data from client socket
                    if ($input == null) { //if data is blank, client has disconnected from socket
                        $this->call('__close', false, $i);
                        echo PHP_EOL . "client[$i] " . $this->c[$i]->ad . ' : ' . $this->c[$i]->p . ' disconnected' . PHP_EOL . PHP_EOL;
                        $this->close($i);
                    }
                }
            }
        }
    }
    //function close called to close all sockets
    public function close($id = null) { //optional parameter id decides which sockets to close
        if (($id !== null) && ($id >= 0)) { //close client socket
            if (isset($this->c[$id])) {
                socket_close($this->c[$id]); //close client socket connection
                unset($this->c[$i]); //remove client from list of client sockets
            }
        } elseif (($id !== null) && ($id >= $this->mc)) { //close all clients id is too large
            for ($i = 0; $i < $this->mc; $i++) { //loop through client array
                if (isset($this->c[$i])) {
                    socket_close($this->c[$i]); //close existing client sockets
                    unset($this->c[$i]);
                }
            }
        }
        if (($id < 0) || ($id === null)) socket_close($this->s); //close master socket if id is negative or null
    }
    //function send called to send messages to individual or all clients
    public function send($msg, $id = null) {
        if ($id === null) array_push($this->am, $this->mask($msg));
        else {
            if (!isset($this->c[$id])) {
                $e = array_shift(debug_backtrace());
                echo "[ERROR] client $id does not exist ({$e['file']}:{$e['line']})" . PHP_EOL;
                return false;
            }
            array_push($this->cm, array('id' => $id, 'msg' => $this->mask($msg)));
        }
        return true;
    }
    //function on called to create socket events with callbacks
    public function bind($n, $f) { //event name and callback
        // if (($n == '__close') || ($n == '__open')) {
        //     $e = array_shift(debug_backtrace());
        //     echo "[ERROR] event '$n' is reserved by PocketJS and cannot be overriden ({$e['file']}:{$e['line']})" . PHP_EOL;
        //     return false;
        // }
        $this->on[$n] = $f; //assign event name to callback in assoc array
        return true;
    }
    //function call called to run events created with on()
    public function call($n, $a = null) { //event name, array args (true = load args from array, false = load args from hidden params)
        if (func_num_args() < 1) {
            $e = array_shift(debug_backtrace());
            echo "[ERROR] function 'call()' requires an event name ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false;
        }
        if (!isset($this->on[$n])) { //if given event is not defined, cannot be run
            $e = array_shift(debug_backtrace());
            echo "[ERROR] event '$n' does not exist ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false; //error out of function
        }
        //get number of arguments for event callback

        if (func_num_args() == 1) $y = 0;
        elseif ($a) {
            if (is_array(func_get_args()[2])) $y = count(func_get_args()[2]); //if array passed in, arg num is length of array
            else {
                $e = array_shift(debug_backtrace());
                echo "[ERROR] param #3 of call() expected to be array -- set param #2 to false to pass in individual arguments ({$e['file']}:{$e['line']})" . PHP_EOL;
                return false;
            }
        }
        else $y = func_num_args() - 2; //if array not passed in, get number of params passed in to call
        $x = (new ReflectionFunction($this->on[$n]))->getNumberOfRequiredParameters(); //get number of parameters callback requires
        if ($x != $y) { //if parameter amounts don't match, event cannot be run
            $e = array_shift(debug_backtrace());
            echo "[ERROR] event '$n' must be given $x arguments, $y given ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false; //error out of function
        }
        if ($y == 0) $this->on[$n](); //if event has no arguments, run event by simply calling callback
        elseif (@$a) call_user_func_array($this->on[$n], func_get_args()[2]);
        else call_user_func_array($this->on[$n], array_slice(func_get_args(), 2));
        return true; //if function has not errored out and program has not died, succeed
    }
    //function unmask called to unmask masked data received from client
    private function unmask($text) { //parameter text (masked string data) to be unmasked
        $length = ord($text[1]) & 127;
        if ($length == 126) {
            $masks = substr($text, 4, 4);
            $data = substr($text, 8);
        } elseif ($length == 127) {
            $masks = substr($text, 10, 4);
            $data = substr($text, 14);
        } else {
            $masks = substr($text, 2, 4);
            $data = substr($text, 6);
        }
        $text = '';
        for ($i = 0; $i < strlen($data); ++$i) $text .= $data[$i] ^ $masks[$i%4];
        return $text;
    }
    //function mask called to mask unmasked data to send to client
    private function mask($text) { //parameter text (unmasked string data) to be masked
        $b1 = 0x80 | (0x1 & 0x0f);
        $length = strlen($text);
        if ($length <= 125) $header = pack('CC', $b1, $length);
        elseif ($length > 125 && $length < 65536) $header = pack('CCn', $b1, 126, $length);
        elseif ($length >= 65536) $header = pack('CCNN', $b1, 127, $length);
        return $header.$text;
    }
}
?>
