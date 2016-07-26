<?php
include('pocket.php');

$log = array();
$users = array();

$ip = $argv[3];
$port = $argv[4];
$pocket = new Pocket($ip, $port, 20);
$pocket->onOpen(function ($id) {
    global $pocket;
    $pocket->log("user[$id] connected");
});
$pocket->onClose(function ($id) {
    global $pocket;
    $pocket->log("user[$id] disconnected");
});
$pocket->bind('username', function ($username, $id) {
    global $pocket, $users;
    $users[$id] = "$username";
    $pocket->log("user[$id] is '$username'");
    $pocket->send('username', $id, true, $username);
});
$pocket->bind('ready', function ($id) {
    global $pocket, $log;
    foreach ($log as $entry) $pocket->send('message', $id, $entry['user'], $entry['message'], $entry['id']);
});
$pocket->bind('message', function ($message, $id) {
    global $pocket, $log, $users;
    $username = $users[$id];
    array_push($log, array('user' => "$username", 'id' => $id, 'message' => "$message"));
    $pocket->log("user[$id] $username: $message");
    $pocket->sendAll('message', "$username", "$message", $id);
});

$pocket->open();
?>
