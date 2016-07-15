<?php

error_reporting(E_ALL);
$handle = popen('server.php', 'r');
echo "'$handle'; " . gettype($handle) . PHP_EOL;
$read = fread($handle, 2096);
echo $read;
pclose($handle);

?>
