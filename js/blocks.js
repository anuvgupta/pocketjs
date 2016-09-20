Block('break', function () {
    var block = Block('span')
        .add(Block('br'));
    return block;
}, function (block, data) {
    var value = data('val');
    if (value !== null) {
        for (var i = 1; i < value; i++) block.add(Block('br'));
    }
    block.add = function () {
        return block;
    };
});

Block('text', function () {
    var block = Block('span');
    return block;
}, function (block, data) {
    var value = data('val');
    if (value != null)
        block.node().appendChild(document.createTextNode(value.replace(/&nbsp;/g, ' ')));
    var html = data('html');
    if (html != null) block.html(html);
});

Block('image', function () {
    var block = Block('div');
    block.css('opacity', '0');
    return block;
}, function (block, data, css) {
    block.add = function () {
        return block;
    };
    var element = block.node();
    var src = data('src');
    var height = data('height');
    var width = data('width');
    if (src != null) {
        var img = new Image();
        img.onload = function () {
            var c = document.createElement('canvas');
            c.width = this.naturalWidth;
            c.height = this.naturalHeight;
            c.getContext('2d').drawImage(this, 0, 0);
            block.css('background-image', "url('" + c.toDataURL('image/png') + "')");
            setTimeout(function () {
                if (css('opacity') != null) element.style.opacity = css('opacity');
                else block.css('opacity', '1');
            }, 10);
        };
        img.src = src;
        block.css({
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
        });
    }
    if (height !== null) element.style.height = height;
    else element.style.height = 'auto';
    if (width !== null) element.style.width = width;
    else element.style.width = 'auto';
});

Block('panel', function () {
    var inner = Block()
        .css({
            backgroundColor: '#222',
            borderRadius: '20px',
            height: '93%',
            width: '85%',
            margin: '0 auto'
        })
        .__child('content')
            .css({
                paddingTop: '3%',
                height: '97%',
                position: 'relative'
            })
            .__parent()
    ;
    var block = Block('div')
        .css({
            top: '0',
        	bottom: '10%',
        	position: 'absolute'
        })
        .add(Block('block', 1)
            .__child('content')
                .css({
                    paddingTop: '3%',
                    height: '97%',
                    position: 'relative'
                })
                .__parent()
            .add('text', 'title')
            .add(inner)
        )
        .setAdd(inner);
    return block;
}, function (block, data) {
    var title = data('title');
    if (title != null && title != undefined) {
        block.key('title', title)
            .child('block/title')
                .css({
                    display: 'block',
                    paddingBottom: '6px',
                    fontSize: '19px',
                    color: '#cdcdcd'
                })
                .data(title)
        ;
    }
});

Block('link button', function () {
    var block = Block('a');
    var reg = {
        height: '100%',
        width: '33.3%'
    };
    var alt = {
        height: '80px',
        width: '100%'
    };
    block
        .attribute('target', '_blank')
        .css('text-decoration', 'none')
        .__add(Block('block', 1)
            .css('display', 'inline-table')
            .css(reg)
        )
        .setAdd(block.__child('block'))
        .add(Block('block', 'button')
            .css({
                height: '60px',
                width: '218px',
                backgroundColor: '#2B2B2B',
                borderRadius: '7px',
                margin: '0 auto',
                transition: 'background-color 0.25s ease'
            })
            .on('mouseenter', function () {
                block.child('button').css('background-color', '#313131');
            })
            .on('mouseleave', function () {
                block.child('button').css('background-color', '#2B2B2B');
            })
            .add(Block('text', 1)
                .css({
                    textTransform: 'uppercase',
                    color: '#C7C7C7'
                })
            )
        )
        .on('alt', function () {
            block.__child('block').css(alt);
        })
        .on('reg', function () {
            block.__child('block').css(reg);
        })
    ;
    return block
}, function (block, data) {
    block.child('button/text').data(data('val'));
});
