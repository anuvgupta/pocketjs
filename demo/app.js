var node = function (id) { return document.getElementById(id); };
var pocket = Pocket();
var name = '';
window.addEventListener('load', function () {
    // what is this? logic
    var toggled = false;
    node('info').addEventListener('click', function () {
        toggled = !toggled;
        if (toggled) {
            node('info').style.width = '350px';
            node('info').style.height = '210px';
            document.querySelector('#info #top').style.paddingTop = '12px';
            document.querySelector('#info #top').style.height = '35px';
        } else {
            node('info').style.width = '260px';
            node('info').style.height = '65px';
            document.querySelector('#info #top').style.paddingTop = '18px';
            document.querySelector('#info #top').style.height = '65px';
        }
    });

    // main demo logic
    var send = function () {
        var val = node('input').value;
        node('input').value = '';
        if ((val !== null) && (val != '') && val.trim() != '') {
            if ((name == null) || (name == '') || (name.trim() == ''))
                pocket.send('username', val);
            else pocket.send('message', val);
        }
    };
    node('submit').addEventListener('click', send);
    node('input').addEventListener('keyup', function (e) {
        if ((e.keyCode ? e.keyCode : e.which) == '13') send();
    });
    pocket.bind('username', function (success, username) {
        if (success) {
            node('output').style.height = (0.66 * window.innerHeight) + 'px';
            setTimeout(function () {
                node('output').style.overflowY = 'auto';
            }, 500);
            node('output').style.backgroundColor = '#222222';
            node('output').style.borderStyle = 'solid';
            node('output').style.borderBottomWidth = '45px';
            node('input').style.borderRadius = '0 0 0 10px';
            node('input').placeholder = 'message';
            node('submit').style.borderRadius = '0 0 10px 0';
            node('submit').innerHTML = 'send';
            name = username;
            pocket.send('ready');
        } else console.log('Username not accepted');
    });
    pocket.bind('message', function (user, message, id) {
        if (!((name == null) || (name == '') || (name.trim() == ''))) {
            node('output').innerHTML += "<span id = 'message'><strong>" + user + '</strong>: ' + message + '</span><br/>';
            node('output').scrollTop += 50;
        }
    });
    pocket.connect('pocketjs.ml', 8000, 'chat.php');
});
