<?php

include('pocket.php');

// get ip and port from arguments
$ip = $argv[2];
$port = $argv[3];
// create new pocketjs WebSocket server
$pocket = new Pocket($ip, $port, 20, null);

// when a client sends a message
$pocket->bind('sendmsg', function ($msg, $id) use ($pocket) {
    $pocket->log("$msg"); // log the new message
    $pocket->sendAll('newmsg', "$msg"); // send the message to all clients
});

// start the server
$pocket->open();

?>
