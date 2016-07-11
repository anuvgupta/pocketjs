var pocket = {
    ws: null,
    connect: function (domain, port, script) {
        ws = new WebSocket('ws://' + domain + ':' + port + '/' + script);
    }
};
