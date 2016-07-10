<?php

$pocket = new Pocket('', 0, 0);

class Pocket {
    protected $s; //master socket
    protected $d; //server domain
    protected $p; //server port
    protected $c; //client array
    protected $mc; //max clients
    protected $v; //verbose run
    public function __construct($d, $p, $mc, $v = null) {
        $this->d = $d ?: 'domain';
        $this->p = $p ?: 8000;
        $this->c = array();
        $this->mc = $mc ?: 25;
        $this->v = ($v !== null) ? $v : true;
        if ($this->v) echo PHP_EOL;
        if (!($this->s = socket_create(AF_INET, SOCK_STREAM, 0))) //create blank websocket
            die ('socket_create(' . AF_INET . ', ' . SOCK_STREAM . ', 0): fail - [' . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
         if ($this->v) echo 'pocket created' . PHP_EOL;
    }

    public function open() {
        if (!(socket_bind($this->s, $this->d, $this->p))) //bind socket to domain and port
            die ("socket_bind(\$socket, $this->d, $this->p): fail - [" . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
        if (!(socket_listen($this->s, $this->mc))) //commence listening for clients
            die ("socket_listen(\$socket, $this->mc): fail - [" . socket_last_error() . '] ' . socket_strerror(socket_last_error()) . PHP_EOL);
        if ($this->v) echo "pocket listening on {$this->d}:{$this->p}" . PHP_EOL;
        if ($this->v) echo PHP_EOL . 'waiting for connections' . PHP_EOL . PHP_EOL;
        
        }
    }

    public function close() {
        @socket_close($this->s);
    }

    private function unmask($text) {
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
        $text = "";
        for ($i = 0; $i < strlen($data); ++$i) {
            $text .= $data[$i] ^ $masks[$i%4];
        }
        return $text;
    }

    private function mask($text) {
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
