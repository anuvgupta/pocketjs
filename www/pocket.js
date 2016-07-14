var Pocket = (function () {
    //private data
    var ws = null;
    var ol = false;
    //var on = { };

    //public data
    var data = {
        connect: function (domain, port, server) {
            ws = new WebSocket('ws://' + domain + ':' + port + '/' + server);
            ws.onopen = function (e) {
                ol = true;
                console.log('[POCKET] connected');
            }
            ws.onclose = function (e) {
                ol = false;
                console.log('[POCKET] disconnected');
            };
            ws.onmessage = function (e) {
                var data = JSON.parse(e.data);
            };
            ws.onerror = function (e) {
                if (e.data == null) console.log('[POCKET] unknown error');
                else console.log('[POCKET] error: ' + e.data);
            };
            window.onbeforeunload = function () {
                ol = false;
                ws.send(JSON.stringify({ call: '__close' }));
                console.log('[POCKET] closing');
            };
        },
        send: function (data) {
            if (ol) ws.send(JSON.stringify(data));
        },
        bind: function () {

        },
        call: function () {

        },
        online: function () {
            return ol;
        }
    };
    return data;
})();
