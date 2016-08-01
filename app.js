var _ = function (id) { return document.getElementById(id); };
var body;
body = Block('div', 'app')
    .add(Block('div', 'main')
        .add(Block('block', 'intro')
            .cssContent('position', 'relative')
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
                    body.child('main/intro/nav/down').css('opacity', '0.97');
                    body.child('main/intro/nav').css('animation', 'slowbounce 1s ease-in-out infinite');
                })
                .on('mouseout', function () {
                    body.child('main/intro/nav/down').css('opacity', '0.65');
                    body.child('main/intro/nav').css('animation', 'none');
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
                .add('text', 'text')
            )
            .add(Block('panel', 'middle')
                .add('text', 'text')
            )
            .add(Block('panel', 'right')
                .add('text', 'text')
            )
            .add(Block('div', 'bottom')
                .add(Block('block', 'block')
                    .add(Block('block', 'block')
                        .cssContent('padding', '0')
                        .add(Block('text', 'text'))
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
    $(document).scroll(function () {
        var nav = body.child('main/intro/nav');
        if (nav.$().offset().top - $(window).scrollTop() < window.innerHeight/3.2) nav.css('opacity', '0');
        else nav.css('opacity', '1');
    });
}

function size () {
    var _main = body.child('main').node();
    _main.style.paddingRight = (_main.offsetWidth - _main.clientWidth) + 'px';
    var intro = body.child('main/intro');
    var reset = function () {
        intro.child('logo').css('height', '400px');
        intro.child('logo').css('width', '400px');
        intro.child('title').css('font-size',  '150px');
        intro.child('text').css('font-size', '24px');
        intro.child('text/space').node().innerHTML = ' ';
        intro.child('nav').css('display', 'block');
    };
    var off = function () { return intro.child('text').$().offset().top + 24 + parseFloat(intro.child('text').css('font-size')) > intro.child('nav').$().offset().top; };
    var phone = function () { return window.innerHeight > window.innerWidth; };
    if (off()) {
        setTimeout(function () {
            intro.child('logo').css('height', (0.48 * window.innerHeight) + 'px')
                                .css('width', (0.48 * window.innerHeight) + 'px');
            intro.child('title').css('font-size',  '138px');
            intro.child('text').css('font-size', '23px');
        }, 5);
        if (off()) intro.child('nav').css('display', 'none');
    } else reset();
    if (phone()) {
        intro.child('logo').css('height', (0.43 * window.innerHeight) + 'px')
                            .css('width', (0.43 * window.innerHeight) + 'px');
        intro.child('title').css('font-size',  '118px');
        intro.child('text').css('font-size', '22.5px');
        intro.child('text/space').node().innerHTML = '<br/>';
    } else reset();
}

$(window).resize(size)
$(document).ready(load);
