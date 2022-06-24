<?php
include('pocket.php');

// persistent data
$log = array(); // log of all past messages
$users = array(); // record of usernames

// get ip and port from arguments/env
$ip = getenv('IP', false) ? getenv('IP') : $argv[2];
$port = getenv('PORT', false) ? getenv('PORT') : $argv[3];
// create new pocketjs WebSocket server
$pocket = new Pocket($ip, $port, 20, null);

// when client connects
$pocket->onConn(function ($id) use (&$pocket) {
    $pocket->log("user[$id] connected"); // log event
});
// when client disconnects
$pocket->onClose(function ($id) use (&$pocket, &$users) {
    $pocket->log("user[$id] disconnected"); // log event
    $pocket->sendAll('newmsg', '[SERVER]', "User {$users[$id]} disconnected", -1); // notify all other clients
    unset($users[$id]); // remove username
});

// when a client is connected and wants to join the room
$pocket->bind('join', function ($username, $id) use (&$pocket, &$users) {
    if (ctype_alnum($username)) { // if username alphanumeric
        $users[$id] = "$username"; // save username
        $pocket->log("user[$id] is '$username'"); // log event
        $pocket->send('username', $id, true, $username); // notify client of acceptance
        $pocket->sendAll('newmsg', '[SERVER]', "User $username connected", -1); // notify all other clients
    } else $pocket->send('username', $id, false, $username); // if username invalid, notify client
});

// when a client has joined and wants to recieve all previous messages (chat history)
$pocket->bind('ready', function ($id) use (&$pocket, &$log) {
    foreach ($log as $entry) // loop through each previous message in the log, and send to client
        $pocket->send('newmsg', $id, $entry['user'], $entry['message'], $entry['id']);
});

// when a client sends a message
$pocket->bind('sendmsg', function ($message, $id) use (&$pocket, &$log, &$users) {
    $username = $users[$id]; // get client's username
    array_push($log, array('user' => "$username", 'id' => $id, 'message' => "$message")); // save message to log
    $pocket->log("user[$id] $username: $message"); // log event
    $pocket->sendAll('newmsg', "$username", "$message", $id); // send message to all other clients
});

// start the server
$pocket->open();
?>
