<?php
include ('./pocket.php');
$log = array();
$pocket = new Pocket('localhost', 30000, 20, 'RUBBR.IO');
$pocket->bind('message', function ($username, $message) {
    global $pocket, $log;
    echo "[CHAT] $username: $message" . PHP_EOL;
    $pocket->sendAll('message', "$username", $message);
});
$pocket->open();
?>
