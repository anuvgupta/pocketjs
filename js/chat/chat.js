Block('chat message', function () {
    var block = Block('div', 'message');
    block
        .add(Block('text', 1)
            .css({
                fontSize: '16px',
                color: '#DEDEDE'
            })
        )
        .css({
            height: '20px',
            width: '100%',
            padding: '2px 16px',
            textAlign: 'left'
        })
    ;
    return block;
}, function (block, data) {
    var user = data('user');
    var msg = data('msg');
    var html = data('html');
    var val = data('val');
    if (user != null && msg != null)
        block.child('text')
            .add(Block('text', 'username').data(user).css({
                fontWeight: 'bold',
                fontSize: 'inherit',
                color: 'inherit'
            }))
            .add(Block('text', 'colon').data(': ').css({
                fontSize: 'inherit',
                color: 'inherit'
            }))
            .add(Block('text', 'message').data(msg).css({
                fontSize: 'inherit',
                color: 'inherit'
            }))
        ;
        // .html('<span><b>' + user + '</b>: ' + msg + '</span>');
    else if (html != null) block.child('text').html(html);
    else if (val != null) block.child('text').data(val);
});

Block('chat', function () {
    var blockroot = 'js/chat/';
    var pocket = Pocket();
    var block;
    block = Block('div', 'chat')
        .key('pocket', pocket)
        .key('connected', false)
        .key('username', false)
        .add(Block('div', 'output')
            .add('chat message', 'connecting')
        )
        .add(Block('div', 'input')
            .add(Block('input', 'box')
                .on('keyup', function (e) {
                    if ((e.keyCode ? e.keyCode : e.which) == '13')
                        block.child('input/button').on('click');
                })
            )
            .add(Block('button', 1)
                .bind('html', function (html) {
                    block.child('input/button').html(html);
                })
                .on('mouseenter', function () {
                    block.child('input/button').css('background-color', '#2D2D2D');
                })
                .on('mouseleave', function () {
                    block.child('input/button').css('background-color', '#222222');
                })
                .on('click', function () {
                    var name = block.key('username');
                    var val = block.child('input/box').node().value;
                    if (val !== null && val != '' && val.trim() != '') {
                        if (name == false || name == null || name.trim() == '')
                            pocket.send('username', val);
                        else pocket.send('message', val);
                    }
                })
            )
        )
        .load(null, blockroot + 'chat', 'jQuery')
    ;
    return block;
}, function (block) {
    var msgID = 0;
    if (block.key('connected') == false) {
        var pocket = block.key('pocket');
        block.key('connected', true);
        pocket.bind('username', function (success, username) {
            if (success) {
                block.key('username', username);
                block.child('input/button')
                        .html('send')
                    .sibling('box')
                        .attribute('placeholder', 'message')
                        .node().value = '';
                block.child('output').add(Block('chat message', 'ready')
                    .child('text')
                        .data('status - logged in as ' + username)
                        .css({
                            opacity: '0.75',
                            fontStyle: 'italic'
                        })
                        .parent()
                ).add(Block('chat message', 'receiving')
                    .child('text')
                        .data('status - receiving messages')
                        .css({
                            opacity: '0.75',
                            fontStyle: 'italic'
                        })
                        .parent()
                );
                pocket.send('ready');
            } else block.child('output').add(Block('chat message')
                    .child('text')
                        .data('status - invalid username')
                        .css({
                            opacity: '0.75',
                            fontStyle: 'italic'
                        })
                        .parent()
                )
            ;
        });
        pocket.bind('message', function (user, message, id) {
            msgID++;
            block.child('output')
                .add(Block('chat message', msgID.toString())
                    .data({
                        user: user,
                        msg: message
                    })
                ).node().scrollTop += 50
            ;
        });
        pocket.onOpen(function () {
            block.child('output').add(Block('chat message', 'connected')
                .child('text')
                    .data('status - connected')
                    .css({
                        opacity: '0.75',
                        fontStyle: 'italic'
                    })
                    .parent()
            );
        });
        pocket.connect('aws.anuv.me', 8000, 'chat.php');
    }
});
