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
        $this->bind['__conn'] = function ($id) { };
        $this->bind['__close'] = function ($id) { };
        $this->am = array();
        $this->cm = array();
        $this->v = true;
        $this->n = 'LOCAL';
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
        //init globals
        $s = $this->s; $d = $this->d; $p = $this->p; $c = $this->c; $mc = $this->mc; $v = $this->v;
        if (!(socket_bind($s, $d, $p))) //bind socket to domain and port
            die ("[ERROR] socket_bind(\$s, $d, $p): fail - [" . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
        if (!(socket_listen($s, $mc))) //commence listening for clients
            die ("[ERROR] socket_listen(\$s, $mc): fail - [" . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
        if ($v) {
            echo "[SERVER] pocket listening on $d:$p" . PHP_EOL;
            echo '[SERVER] waiting for connections';
            echo "..\e[5m.\e[25m" . PHP_EOL . PHP_EOL;
        }
        while (true) { //start server
            $read = array(); //array of sockets to be read
            $read[0] = $s; //first socket to be read = master socket
            //add existing (online) clients to read array
            for ($i = 0; $i < $mc; $i++) {
                if (@$c[$i] != null) $read[$i + 1] = $c[$i];
            }
            //select sockets in read array to be watched for status changes
            if (socket_select($read , $write , $except , null) === false) //pass in read, null write and except, null timeout (to block (watch for status change) infinitely)
                die ('[ERROR] socket_select($read , $write , $except , null): fail - [' . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
            //FUNCTIONALITY OF socket_select() IN QUESTION: does it remove all socket elements in $read, and later add them back when status change occurs?

            //check if new client is connecting
            if (in_array($s, $read)) { //if master socket is in read array, master socket's status has changed, thus a client is connecting
                for ($i = 0; $i < $mc; $i++) { //loop through array of clients
                    if (@$c[$i] == null) { //if there is space available for a new connection
                        echo PHP_EOL;
                        $c[$i] = new Client(socket_accept($s), $i); //accept the new socket connection from master socket, construct client and add to client array
                        //display connecting client's details
                        if (socket_getpeername($c[$i]->s, $addr, $pt)) echo "client[$i] $addr : $pt connecting" . PHP_EOL;
                        //accept client socket handshake headers
                        $header = socket_read($c[$i]->s, 1024); //read data from new client socket: contains handshake headers
                        echo 'headers recieved';
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
                            "WebSocket-Origin: " . $d . "\r\n" .
                            "WebSocket-Location: ws://" . $d . ":" . $p . "/daemon.php\r\n".
                            "Sec-WebSocket-Accept:$accept\r\n\r\n";
                        if (socket_write($c[$i]->s, $upgrade, strlen($upgrade)) === false)
                        die ('socket_write: fail - [' . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
                        echo 'headers sent' . PHP_EOL;
                        //display connection details if connection successful
                        if (socket_getpeername($c[$i]->s, $addr, $pt)) {
                            echo 'handshake complete - client connected' . PHP_EOL . PHP_EOL;
                            //send client's data to client
                            $data = $this->mask(json_encode(array('id' => $i, 'address' => $addr, 'port' => $pt)));
                            socket_write($c[$i]->s, $data, strlen($data));
                            $this->call('__connection', $i);
                        }
                        // print_r($c);
                        break;
                    }
                }
            }

            //calculate client data?

            //send clients data
            for ($j = 0; $j < count($am); $j++) {
                $msg = $am[$j];
                for ($i = 0; $i < $mc; $i++) {
                    if ((@$c[$i] != null) && isset($c[$i])) socket_write($c[$i], $msg, strlen($msg));
                }
                unset($am[$j]);
            }
            for ($j = 0; $j < count($am); $j++) {
                $a = $cm[$j];
                if ((@$c[$a['id']] != null) && isset($c[$a['id']])) socket_write($c[$a['id']], $a['msg'], strlen($a['msg']));
                else {
                    $e = array_shift(debug_backtrace());
                    echo "[ERROR] client {$a['id']} does not exist ({$e['file']}:{$e['line']})";
                }
                unset($cm[$j]);
            }

            //check if client sockets have sent data
            for ($i = 0; $i < $mc; $i++) { //loop through client sockets
                if (in_array(@$c[$i] , $read)) { //if client socket is defined and is in read array, its status has changed and it is sending data
                    //recieve data from client
                    while (@socket_recv($c[$i], $masked_data, 1024, 0) >= 1) { //if client sends new data (0 bytes = disconnected, 1 byte = connected, >1 bytes = new data sent to server)
                        $data = json_decode($this->unmask($masked_data), true);
                        $this->call($data['type'], $data['args']);
                        break 2;
                    }
                    //check if client has disconnected
                    $input = @socket_read($c[$i], 1024, PHP_NORMAL_READ); //read data from client socket
                    if ($input == null) { //if data is blank, client has disconnected from socket
                        $this->call('__close', $i);
                        echo PHP_EOL . "client[$i] " . $c[$i]->ad . ' : ' . $c[$i]->p . ' disconnected' . PHP_EOL . PHP_EOL;
                        socket_close($c[$i]); //close client socket connection
                        unset($c[$i]); //remove client from list of client sockets
                        // print_r($c);
                    }
                }
            }
        }
    }
    //function close called to close all sockets
    public function close($x = null) { //optional parameter x decides which sockets to close
        if (($x === 1) || ($x === null)) { //close clients if x is 1 or no params
            for ($i = 0; $i < $this->mc; $i++) { //loop through client array
                if (isset($this->c[$i])) @socket_close($this->c[$i]); //close existing client sockets
            }
        }
        if (($x === 0) || ($x === null)) @socket_close($this->s); //close master socket if x is 0 or no params
    }
    //function send called to send messages to individual or all clients
    public function send($msg, $id = null) {
        $e = array_shift(debug_backtrace());
        if ($id === null) array_push($this->am, $this->mask($msg));
        else {
            if (!isset($this->c[$id])) {
                echo "[ERROR] client $id does not exist ({$e['file']}:{$e['line']})" . PHP_EOL;
                return false;
            }
            array_push($this->cm, array('id' => $id, 'msg' => $this->mask($msg)));
        }
        return true;
    }
    //function on called to create socket events with callbacks
    public function bind($n, $f) { //event name and callback
        $this->on[$n] = $f; //assign event name to callback in assoc array
    }
    //function call called to run events created with on()
    public function call($n, $a) { //event name, array args (true = load args from array, false = load args from hidden params)
        $e = array_shift(debug_backtrace());
        if (!isset($this->on[$n])) { //if given event is not defined, cannot be run
            echo "[ERROR] event '$n' does not exist ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false; //error out of function
        }
        //get number of arguments for event callback
        if ($a) {
            if (is_array(func_get_args()[2])) $y = count(func_get_args()[2]); //if array passed in, arg num is length of array
            else {
                echo "[ERROR] param #3 of call() expected to be array -- set param #2 to false to pass in individual arguments ({$e['file']}:{$e['line']})" . PHP_EOL;
                return false;
            }
        }
        else $y = func_num_args() - 2; //if array not passed in, get number of params passed in to call
        $x = (new ReflectionFunction($this->on[$n]))->getNumberOfRequiredParameters(); //get number of parameters callback requires
        if ($x != $y) { //if parameter amounts don't match, event cannot be run
            echo "[ERROR] event '$n' must be given $x arguments, $y given ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false; //error out of function
        }
        if ($y == 0) $this->on[$n](); //if event has no arguments, run event by simply calling callback
        else if ($a) call_user_func_array($this->on[$n], func_get_args()[2]);
        else call_user_func_array($this->on[$n], array_slice(func_get_args(), 2));
        return true; //if function has not errored out and program has not died, succeed
    }
    //function unmask called to unmask masked data received from client
    private function unmask($text) { //parameter text (masked string data) to be unmasked
        $length = ord($text[1]) & 127;
        if ($length == 126) {
            $masks = substr($text, 4, 4);
            $data = substr($text, 8);
        }
        elseif ($length == 127) {
            $masks = substr($text, 10, 4);
            $data = substr($text, 14);
        }
        else {
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
        if($length <= 125)
        $header = pack('CC', $b1, $length);
        elseif($length > 125 && $length < 65536)
        $header = pack('CCn', $b1, 126, $length);
        elseif($length >= 65536)
        $header = pack('CCNN', $b1, 127, $length);
        return $header.$text;
    }
}
?>
