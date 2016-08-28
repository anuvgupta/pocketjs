Block('chat', function () {
    var block;
    block = Block('div', 'chat')
        .add(Block('div', 'input')
            .add(Block('input', 'box')
                .attribute('placeholder', 'nickname')
                .on('keyup', function (e) {
                    if ((e.keyCode ? e.keyCode : e.which) == '13')
                        block.child('input/button').on('click');
                })
            )
            .add(Block('button', 1)
                .html('send')
                .on('mouseenter', function () {
                    block.child('input/button').css('background-color', '#2d2d2d');
                })
                .on('mouseleave', function () {
                    block.child('input/button').css('background-color', '#222');
                })
                .on('click', function () {
                    var text = block.child('input/box').node().value;
                    if (text.trim() != '') {
                        console.log(text);
                    }
                })
            )
        )
        .load(null, 'js/chat/chat', 'jQuery')
    ;
    return block;
}, function (block) { });
