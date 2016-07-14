<?php
include ('./pocket.php');
$pocket = new Pocket('localhost', 30000, 20, 'RUBBR.IO');
$pocket->bind('hi', function ($data1, $data2) {
    echo "[TEST] $data1 $data2" . PHP_EOL;
});
//$pocket->call('hi', false, 'hello', 'world');
$pocket->open();
?>
