<?php
$cli = 2;
include('../pocket.php');
header( 'Content-type: text/html; charset=utf-8' );
$password = 'dank memes';
$server = '../server.php';
$pid = file_get_contents('../server.txt');
$auth = @$_POST['password'] == $password;
$pass = @$_POST['cmd'] == 'login' && $auth;
$start = @$_POST['cmd'] == 'start server' && $auth;
$stop = @$_POST['cmd'] == 'stop server' && $auth;
if ($start) {
    $process = Pocket::start($server);
    $pid = proc_get_status($process[0])['pid'];
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>pocketjs admin</title>
        <script type = 'text/javascript' src = './pocket.js'></script>
        <?php if ($stop) { ?>
        <script type = 'text/javascript'>
            window.addEventListener('load', function () {
                setTimeout(function () {
                    Pocket.connect('mangofam.tk', 30000, 'server.php');
                }, 200);
            });
        </script>
        <?php } ?>
    </head>
    <body>
        <div id = 'content' style = 'text-align: center'>
            <br/>
            <span id ='title'>PocketJS Admin</span>
            <div id = 'inputwrap'>
                <form id = 'form' method = 'post' action = "<?=$_SERVER['PHP_SELF'];?>">
                <?php if ($start || $stop || $pass) { ?>
                    <input type = 'submit' name = 'cmd' id = 'start' <?php if (isset($pid) && $pid != '' && !$stop) echo 'disabled'; ?> value = 'start server'/>
                    <input type = 'submit' name = 'cmd' id = 'stop' value = 'stop server'/>
                    <input type = 'hidden' id = 'password' name = 'password' value = "<?=$password;?>"/>
                <?php } else { ?>
                    <input type = 'password' id = 'input' name = 'password' placeholder = 'password'/>
                    <input type = 'submit' name = 'cmd' id = 'submit' value = 'login'/>
                <?php } ?>
                </form>
            </div>
            <br/>
            <?php
                if (isset($pid) && $pid != '' && !$stop) echo "<strong>SERVER PROCESS RUNNING AT $pid </strong><br/>";
                if ($start) Pocket::read($process);
                elseif ($stop) {
                    if (file_put_contents('../server.txt', '') === false) echo 'server not stopped<br/>';
                    else echo 'server successfully stopped<br/>';
                }
            ?>
        </div>
    </body>
</html>
