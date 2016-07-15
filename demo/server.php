<?php
include ('./pocket.php');

$log = array();
$users = array();

$pocket = new Pocket('localhost', 30000, 20, 'RUBBR.IO');
$pocket->onOpen(function ($id) {
    echo "[CHAT] user[$id] connected" . PHP_EOL;
});
$pocket->onClose(function ($id) {
    echo "[CHAT] user[$id] disconnected" . PHP_EOL;
});
$pocket->bind('username', function ($username, $id) {
    global $pocket, $users;
    $users[$id] = "$username";
    echo "[CHAT] user[$id] is '$username'" . PHP_EOL;
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
    echo "[CHAT] user[$id] $username: $message" . PHP_EOL;
    $pocket->sendAll('message', "$username", "$message", $id);
});

$pocket->open();
?>
