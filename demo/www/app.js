var element = function (id) { return document.getElementById(id); };
var pocket = Pocket();
var name = '';
window.addEventListener('load', function () {
    var send = function () {
        var val = element('input').value;
        element('input').value = '';
        if ((val !== null) && (val != '') && val.trim() != '') {
            if ((name == null) || (name == '') || (name.trim() == ''))
                pocket.send('username', val);
            else pocket.send('message', val);
        }
    };
    element('submit').addEventListener('click', send);
    element('input').addEventListener('keyup', function (e) {
        if ((e.keyCode ? e.keyCode : e.which) == '13') send();
    });
    pocket.bind('username', function (success, username) {
        if (success) {
            element('output').style.height = (0.66 * window.innerHeight) + 'px';
            setTimeout(function () {
                element('output').style.overflowY = 'auto';
            }, 500);
            element('output').style.backgroundColor = '#222222';
            element('output').style.borderStyle = 'solid';
            element('output').style.borderBottomWidth = '45px';
            element('input').style.borderRadius = '0 0 0 10px';
            element('input').placeholder = 'message';
            element('submit').style.borderRadius = '0 0 10px 0';
            element('submit').innerHTML = 'send';
            name = username;
            pocket.send('ready');
        } else console.log('Username not accepted');
    });
    pocket.bind('message', function (user, message, id) {
        element('output').innerHTML += "<span id = 'message'><strong>" + user + '</strong>: ' + message + '</span><br/>';
        element('output').scrollTop += 50;
    });
    pocket.connect('pocketjs.ml', 8000, 'chat.php');
});
