
Block('list item', function () {
    var block = Block('div');
    block
        .css({
            position: 'relative',
            height: '24px',
            cursor: 'pointer'
        })
        .add(Block('image', 'icon')
            .data({
                src: 'plus.png',
                height: '20px',
                width: '20px',
                css: {
                    display: 'inline-block',
                    position: 'absolute',
                    top: '2px',
                    opacity: '0.7'
                }
            })
        )
        .add(Block('block', 'title')
            .add(Block('text', 1)
                .data('Section Title')
                .css({
                    display: 'block',
                    textAlign: 'left',
                    fontSize: '18px'
                })
            )
            .css({
                display: 'inline-table',
                position: 'absolute',
                left: '30px'
            })
        )
        .on('mouseover', function (e, b) {
            b.child('title/text').css('text-decoration', 'underline');
        })
        .on('mouseout', function (e, b) {
            b.child('title/text').css('text-decoration', 'none');
        })
    ;
    return block;
}, function (block, data, css) {
    var title = data('title');
    if (title != null)
        block.child('title/text').data({
            val: title,
            replace: true
        });
});


var block = Block('div', 'app');
block
    .add(Block('div', 'navbar')
        .add(Block('block', 'logo')
            .add('image', 1)
        )
    )
    .add(Block('div', 'menu')
        .add('div', 'list')
    )
    .add(Block('div', 'body'))
;

$(document).ready(function () {
    var size = function () {
        if (window.innerWidth < 800) {
            block.child('menu');
        }
    };
    block.load(null, 'css', 'jQuery').load(function () {
        $.ajax({
            url: 'docs.block',
            success: function (docs) {
                var docs = block.parse(null, docs, true);
                for (var i in docs.menu) {
                    block.child('menu/list').add(Block('list item', docs.menu[i])
                        .data({
                            title: docs.menu[i]
                        })
                    );
                }
            }
        });
        size();
        $(window).resize(size);
        block.fill(document.body);
    }, 'app', 'jQuery');
});
