var body;
body = Block('div', 'app')
    .add(Block('div', 'main')
        .add(Block('block', 'intro')
            .__child('content')
                .css('position', 'relative')
                .__parent()
            .add('break')
            .add('image', 'logo')
            .add('text', 'title')
            .add('break')
            .add(Block('text', 'text')
                .add('text', 'textL')
                .add('text', 'space')
                .add('text', 'textR')
            )
            .add('div', 'spacer')
            .add(Block('div', 'nav')
                .add('text', 'text')
                .add('image', 'down')
                .on('mouseover', function () {
                    body.child('main/intro/nav')
                        .css('animation', 'slowbounce 1s ease-in-out infinite')
                        .child('down')
                            .css('opacity', '0.97')
                    ;
                })
                .on('mouseout', function () {
                    body.child('main/intro/nav')
                        .css('animation', 'none')
                        .child('down')
                            .css('opacity', '0.65')
                    ;
                })
                .on('click', function () {
                    $(document.body).animate({
                        scrollTop: body.child('main/hook').$().offset().top + $(document.body).scrollTop() + 'px'
                    }, 700);
                })
            )
        )
        .add(Block('div', 'hook')
            .add(Block('panel', 'left')
                .add(Block('div', 1)
                    .class('code_container')
                )
            )
            .add(Block('panel', 'middle')
                .add('text', 1)
            )
            .add(Block('panel', 'right')
                .add(Block('div', 1)
                    .class('code_container')
                )
            )
            .add(Block('div', 'bottom')
                .add(Block('block', 1)
                    .add(Block('block', 1)
                        .__child('content')
                            .css('padding', '0')
                            .__parent()
                        .add('text', 'text')
                    )
                )
            )
        )
    )
;

function load() {
    body.load(function (b) {
        b.fill(document.body);
        size();
        setTimeout(function () {
            b.css('opacity', '1');
        }, 10);
    }, 'app', true);
    $.ajax({
        url: 'code/php.txt',
        dataType: 'text',
        success: function (data) {
            body.child('main/hook/left/div').node().innerHTML = data;
        }
    });
    $.ajax({
        url: 'code/js.txt',
        dataType: 'text',
        success: function (data) {
            body.child('main/hook/right/div').node().innerHTML = data;
        }
    });
    $(document).scroll(function () {
        var nav = body.child('main/intro/nav');
        if (nav.$().offset().top - $(window).scrollTop() < window.innerHeight/3.2)
            nav.css('opacity', '0');
        else nav.css('opacity', '1');
    });
}

function size () {
    var _main = body.child('main').node();
    _main.style.paddingRight = (_main.offsetWidth - _main.clientWidth) + 'px';
    var intro = body.child('main/intro');
    var reset = function () {
        intro.child('logo')
            .css('height', '400px')
            .css('width', '400px')
        .sibling('nav')
            .css('display', 'block')
        .sibling('title')
            .css('font-size',  '150px')
        .sibling('text')
            .css('font-size', '24px')
            .child('space').node().innerHTML = ' ';
    };
    var off = function () {
        return intro.child('text').$().offset().top + 24 + parseFloat(intro.child('text').css('font-size')) > intro.child('nav').$().offset().top;
    };
    var phone = function () {
        return window.innerHeight > window.innerWidth;
    };
    if (off()) {
        setTimeout(function () {
            intro.child('logo')
                .css('height', (0.48 * window.innerHeight) + 'px')
                .css('width', (0.48 * window.innerHeight) + 'px')
            .sibling('title')
                .css('font-size',  '138px')
            .sibling('text')
                .css('font-size', '23px')
            ;
        }, 5);
        if (off()) intro.child('nav').css('display', 'none');
    } else reset();
    if (phone()) {
        intro.child('logo')
            .css('height', (0.43 * window.innerHeight) + 'px')
            .css('width', (0.43 * window.innerHeight) + 'px')
        .sibling('title')
            .css('font-size',  '118px')
        .sibling('text')
            .css('font-size', '22.5px')
            .child('space').node().innerHTML = '<br/>';
    } else reset();
}

$(window).resize(size)
$(document).ready(load);
