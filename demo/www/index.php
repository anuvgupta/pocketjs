<!DOCTYPE html>
<html>
    <head>
        <link rel = 'stylesheet' type = 'text/css' href = './style.css'/>
        <script type = 'text/javascript' src = './pocket.js'></script>
        <script type = 'text/javascript'>
            var element = function (id) { return document.getElementById(id); };
            var name = '';
            window.addEventListener('load', function () {
                var send = function () {
                    var val = element('input').value;
                    element('input').value = '';
                    if ((val !== null) && (val != '') && val != ' ') {
                        if ((name == null) || (name == '') || (name == ' ')) Pocket.send('username', val);
                        else Pocket.send('message', val);
                    }
                };
                element('submit').addEventListener('click', send);
                element('input').addEventListener('keyup', function (e) {
                    if ((e.keyCode ? e.keyCode : e.which) == '13') send();
                });
                Pocket.bind('username', function(success, username) {
                    if (success) {
                        element('output').style.height = (0.7 * window.innerHeight) + 'px';
                        element('output').style.backgroundColor = '#222222';
                        element('output').style.borderStyle = 'solid';
                        element('output').style.borderBottomWidth = '45px';
                        element('input').style.borderRadius = '0 0 0 10px';
                        element('input').placeholder = 'message';
                        element('submit').style.borderRadius = '0 0 10px 0';
                        element('submit').innerHTML = 'send';
                        name = username;
                        Pocket.send('ready');
                    } else console.log('Username not accepted');
                });
                Pocket.bind('message', function (user, message, id) {
                    element('output').innerHTML += "<span id = 'message'><strong>" + user + '</strong>: ' + message + '</span><br/>';
                    element('output').scrollTop += 50;
                });
                Pocket.connect('localhost', 30000, 'demo/server.php');
            });
        </script>
        <title>pocketjs chat</title>
    </head>
    <body>
        <center id = 'content'>
            <span id ='title'>PocketJS Chat</span>
            <div id = 'output'></div>
            <div id = 'inputwrap'>
                <input id = 'input' type = 'text' placeholder = 'nickname'/>
                <button id = 'submit'>join</button>
            </div>
        </center>
    </body>
</html>
