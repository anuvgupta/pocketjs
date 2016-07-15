<?php
class Pocket {
    //instance fields
    protected $n; //name of server
    protected $s; //master socket
    protected $d; //server domain
    protected $p; //server port
    protected $c; //client array
    protected $mc; //max clients
    protected $ev; //reserved event listeners
    protected $on; //custom event listeners
    protected $v; //verbose run
    //constructor method called when new Pocket constructed
    public function __construct($d, $p, $mc, $v = null) {
        $this->d = $d ?: 'localhost';
        $this->p = $p ?: 30000;
        $this->c = array();
        $this->mc = $mc ?: 25;
        $this->ev = array('open' => function ($id) { }, 'run' => function () { }, 'close' => function ($id) { });
        $this->on = array();
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
                            $this->onOpen($i);
                        }
                        break;
                    }
                }
            }

            //calculate client data
            $this->onRun();

            //check if client sockets have sent data
            for ($i = 0; $i < $this->mc; $i++) { //loop through client sockets
                if (in_array(@$this->c[$i] , $read)) { //if client socket is defined and is in read array, its status has changed and it is sending data
                    //recieve data from client
                    while (@socket_recv($this->c[$i], $masked_data, 1024, 0) >= 1) { //if client sends new data (0 bytes = disconnected, 1 byte = connected, >1 bytes = new data sent to server)
                        //$data = json_decode(escapeshellcmd($this->unmask($masked_data)), true);
                        $data = json_decode($this->unmask($masked_data), true);
                        if (isset($data['command'])) {
                            if ($data['command'] == 'close') {
                                $this->close($data['id']);
                                echo PHP_EOL . "client[{$data['id']}] {$data['ad']} : {$data['p']} disconnected" . PHP_EOL;
                            }
                            //elseif ($data['command'] == 'alive') ;
                        } elseif (!isset($data['call'])) {
                            $this->close($i);
                            echo "[SERVER] client[$i] kicked for: sending illegal data: no event specified" . PHP_EOL;
                        } elseif (isset($this->on[$data['call']])) {
                            if (isset($data['args'])) {
                                array_push($data['args'], $i);
                                $this->callArr($data['call'], $data['args']);
                            }
                            else $this->call($data['call'], $i);
                        } else {
                            $this->close($i);
                            echo "[SERVER] client[$i] kicked for: sending illegal data: event '{$data['call']}' does not exist" . PHP_EOL;
                        }
                        break 2;
                    }
                    //check if client has disconnected
                    $input = @socket_read($this->c[$i], 1024, PHP_NORMAL_READ); //read data from client socket
                    if ($input == null) { //if data is blank, client has disconnected from socket
                        $this->close($i);
                        echo PHP_EOL . "client[$i] disconnected" . PHP_EOL;
                    }
                }
            }
        }
    }
    //function close called to close all sockets
    public function close($id = null) { //optional parameter id decides which sockets to close
        if (($id !== null) && ($id >= 0)) { //close client socket
            if (isset($this->c[$id])) {
                $this->onClose($id);
                socket_close($this->c[$id]); //close client socket connection
                unset($this->c[$id]); //remove client from list of client sockets
            }
        } elseif (($id !== null) && ($id >= $this->mc)) { //close all clients if id is too large
            for ($i = 0; $i < $this->mc; $i++) { //loop through client array
                if (isset($this->c[$i])) {
                    socket_close($this->c[$i]); //close existing client sockets
                    unset($this->c[$i]);
                }
            }
        }
        if (($id < 0) || ($id === null)) socket_close($this->s); //close master socket if id is negative or null
    }
    //function send called to send messages to all clients
    public function send($call, $id) {
        if (!isset($this->c[$id])) {
            $e = array_shift(debug_backtrace());
            echo "[ERROR] client $id does not exist ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false;
        }
        $data = array('call' => $call);
        if (func_num_args() > 2) $data['args'] = array_slice(func_get_args(), 2);
        $msg = $this->mask(json_encode($data));
        socket_write($this->c[$id], $msg, strlen($msg));
        return true;
    }
    public function sendAll($call) {
        $data = array('call' => $call);
        if (func_num_args() > 1) $data['args'] = array_slice(func_get_args(), 1);
        $msg = $this->mask(json_encode($data));
        for ($i = 0; $i < $this->mc; $i++) {
            if ((@$this->c[$i] != null) && isset($this->c[$i])) socket_write($this->c[$i], $msg, strlen($msg));
        }
        return true;
    }
    //function on called to create socket events with callbacks
    public function bind($n, $f) { //event name and callback
        $this->on[$n] = $f; //assign event name to callback in assoc array
        return true;
    }
    //function call called to run events created with on()
    public function call($n) { //event name, array args (true = load args from array, false = load args from hidden params)
        //error handling
        if (func_num_args() < 1) {
            $e = array_shift(debug_backtrace());
            echo "[ERROR] function 'call()' requires an event name ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false;
        } elseif (!isset($this->on[$n])) { //if given event is not defined, cannot be run
            $e = array_shift(debug_backtrace());
            echo "[ERROR] event '$n' does not exist ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false; //error out of function
        }
        //get number of arguments for event callback
        $y = func_num_args() - 1; //get number of params passed in to call()
        $x = (new ReflectionFunction($this->on[$n]))->getNumberOfRequiredParameters(); //get number of parameters callback requires
        if (($x != $y) && ($x + 1 != $y)) { //if parameter amounts don't match, event cannot be run
            $e = array_shift(debug_backtrace());
            echo "[ERROR] event '$n' must be given $x arguments, $y given ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false; //error out of function
        }
        if ($y == 0) $this->on[$n](); //if event has no arguments, run event by simply calling callback
        else call_user_func_array($this->on[$n], array_slice(func_get_args(), 1));
        return true; //if function has not errored out and program has not died, succeed
    }
    public function callArr($n, $a) {
        if (is_array($a)) $y = count($a); //if array passed in, arg num is length of array
        else {
            $e = array_shift(debug_backtrace());
            echo "[ERROR] param #2 of callArr() expected to be array -- use call() to pass in individual arguments ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false;
        }
        if (!isset($this->on[$n])) { //if given event is not defined, cannot be run
            $e = array_shift(debug_backtrace());
            echo "[ERROR] event '$n' does not exist ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false; //error out of function
        }
        $y = count($a); //get number of params passed in to call()
        $x = (new ReflectionFunction($this->on[$n]))->getNumberOfRequiredParameters(); //get number of parameters callback requires
        if ($x != $y) { //if parameter amounts don't match, event cannot be run
            $e = array_shift(debug_backtrace());
            echo "[ERROR] event '$n' must be given $x arguments, $y given ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false; //error out of function
        }
        call_user_func_array($this->on[$n], $a);
        return true;
    }
    //function onOpen called to assign callback to or run event for user connection
    public function onOpen($arg = null) {
        if (!isset($arg)) {
            $e = array_shift(debug_backtrace());
            echo "[ERROR] event 'onOpen' must be given client id or callback function ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false; //error out of function
        }
        else if (is_callable($arg)) {
            if ((new ReflectionFunction($arg))->getNumberOfRequiredParameters() > 1) {
                $e = array_shift(debug_backtrace());
                echo "[ERROR] callback for event 'onOpen' must have only 1 argument: client id ({$e['file']}:{$e['line']})" . PHP_EOL;
                return false;
            } else $this->ev['open'] = $arg;
        }
        else call_user_func_array($this->ev['open'], func_get_args());
    }
    //function onRun called to assign callback to or run event for server loop
    public function onRun($arg = null) {
        if (!isset($arg)) $this->ev['run']();
        else if (is_callable($arg)) $this->ev['run'] = $arg;
        else call_user_func_array($this->ev['run'], func_get_args());
    }
    //function onRun called to assign callback to or run event for server loop
    public function onClose ($arg = null) {
        if (!isset($arg)) {
            $e = array_shift(debug_backtrace());
            echo "[ERROR] event 'onClose' must be given client id or callback function ({$e['file']}:{$e['line']})" . PHP_EOL;
            return false; //error out of function
        }
        else if (is_callable($arg)) {
            if ((new ReflectionFunction($arg))->getNumberOfRequiredParameters() > 1) {
                $e = array_shift(debug_backtrace());
                echo "[ERROR] callback for event 'onClose' must have only 1 argument: client id ({$e['file']}:{$e['line']})" . PHP_EOL;
                return false;
            } else $this->ev['close'] = $arg;
        }
        else call_user_func_array($this->ev['close'], func_get_args());
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
