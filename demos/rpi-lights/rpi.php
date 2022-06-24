<?php

require('pocket.php');

$ip = $argv[2];
$port = $argv[3];
$pocket = new Pocket($ip, $port, 20, 50);
$pocket->setOpt('kick-bad-data', false);

$rpi = null;
$data = [
    true, false, true, false, true, false, true, false, true, false
];

$pocket->bind('identify', function ($type, $id) use (&$pocket, &$rpi) {
    if ($type == 'rpi') {
        $rpi = $id;
        $pocket->log("RPi connected as client #$id");
    }
});

$pocket->bind('pull', function ($id) use (&$pocket, &$data) {
    $pocket->send('data', $id, json_encode($data));
    $pocket->log("Update requested by client #$id");
});

$pocket->bind('update', function ($light, $state, $id) use (&$pocket, &$data, &$rpi) {
    $light = intval($light);
    $state = boolval($state);
    if ($light <= count($data)) {
        $data[$light - 1] = $state;
        $pocket->log("Light #$light set to '" . ($state ? 'on' : 'off') . "' by client #$id");
        $pocket->sendAll('data', json_encode($data));
    }
});

$pocket->bind('pull', function ($id) use (&$pocket, &$data) {
    $pocket->send('data', $id, json_encode($data));
    $pocket->log("Update requested by client #$id");
});

$pocket->onClose(function ($id) use (&$pocket, &$rpi) {
    if ($id == $rpi) {
        $rpi = null;
        $pocket->log("RPi has disconnected");
    }
});

$pocket->open();

?>
