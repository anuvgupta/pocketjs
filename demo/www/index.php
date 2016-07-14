<!DOCTYPE html>
<html>
    <head>
        <style type = 'text/css'>
            body {
                background-color: #111111;
            }
            #output {
                height: 400px;
                width: 500px;
                background-color: #555555;
                margin: 8px;
                padding: 8px 15px 8px 15px;
                font: 20px Arial, sans-serif;
                color: #EEEEEE;
            }
            #message {
                width: 500px;
                overflow-x: hidden;
                word-wrap: break-word;
            }
            #input {
                text-align: center;
            }
        </style>
        <script type = 'text/javascript' src = './pocket.js'></script>
        <script type = 'text/javascript'>
            var element = function (id) { return document.getElementById(id); };
            window.addEventListener('load', function () {
                var send = function () {
                    Pocket.send('message', Pocket.getID(), element('input').value);
                };
                element('submit').addEventListener('click', send);
                element('input').addEventListener('keyup', function (e) {
                    if ((e.keyCode ? e.keyCode : e.which) == '13') send();
                });
                Pocket.bind('message', function (user, message) {
                    element('output').innerHTML += "<span id = 'message'><strong>" + user + '</strong>: ' + message + '</span><br/>';
                });
                Pocket.connect('localhost', 30000, 'demo/server.php');
            });
        </script>
    </head>
    <body>
        <center>
            <div id = 'output'></div>
            <input id = 'input' type = 'text' placeholder = 'Message'/>
            <button id = 'submit'>Send</button>
        </center>
    </body>
</html>
