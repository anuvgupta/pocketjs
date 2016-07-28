var _ = function (id) { return document.getElementById(id); };
var body = Block('wrap')
    .id('wrap')
    .add(Block('main')
        .id('main')
        .add(Block()
            .id('intro')
            .add('break')
            .add(Block('image', {
                    src: './img/logo2.png',
                    height: '400px',
                    width: '400px'
                })
                .class('logo')
            )
            .add(Block('text', 'pocketjs')
                .class('title')
            )
            .add('break')
            .add(Block('text')
                .add(Block('text', 'realtime websocket applications')
                    .class('text')
                )
                .add(Block('text', ' ')
                    .class('space')
                )
                .add(Block('text', 'with PHP and JavaScript')
                    .class('text')
                )
            )
            .add('spacer')
            .add(Block('nav')
                .add(Block('text', 'check it out')
                    .class('text')
                )
                .add(Block('image', {
                        src: './img/down.png',
                        height: '35px',
                        width: '60px'
                    })
                    .class('image')
                )
            )
        )
        .add(Block()
            .id('hook')
            .add(Block('left panel')
                .add(Block()
                    .add(Block()
                        .class('inner')
                        .add('text', 'server code')
                    )
                )
            )
            .add(Block('middle panel')
                .add(Block()
                    .add(Block()
                        .class('inner')
                        .add('text', 'chat demo')
                    )
                )
            )
            .add(Block('right panel')
                .add(Block()
                    .add(Block()
                        .class('inner')
                        .add('text', 'client code')
                    )
                )
            )
            .add(Block('bottom')
                .add(Block()
                    .add(Block()
                        .add(Block('text', 'pocketjs simplifies server and client side realtime operations with an intuitive yet robust api')
                            .class('text')
                        )
                        // .add(Block('text', 'view documentation')
                        //     .class('link')
                        // )
                    )
                )
            )
        )
    )
;

function load() {
    body.fill(document.body);
    size();
    $('#intro .content .nav .image').click(function () {
        $('#main').animate({
            scrollTop: $('#hook').offset().top + $('#main').scrollTop() + 'px'
        }, 700);
    });
    $('#main').scroll(function () {
        if ($('#intro .content .nav').offset().top < window.innerHeight/3.2) $('#intro .content .nav').css('opacity', '0');
        else $('#intro .content .nav').css('opacity', '1');
    });
    _('main').style.opacity = 1;
}

function size () {
    _('main').style.paddingRight = (_('main').offsetWidth - _('main').clientWidth) + 'px';
    var reset = function () {
        $('#intro .content .logo').height('400px');
        $('#intro .content .logo').width('400px');
        $('#intro .content .title').css('font-size',  '150px');
        $('#intro .content .text').css('font-size', '24px');
        $('#intro .content .text .space').html(' ');
        $('#intro .content .nav').css('display', 'block');
    };
    var off = function () { return $('#intro .content .text').offset().top + 24 + parseFloat($('#intro .content .text').css('font-size')) > $('#intro .content .nav').offset().top; };
    var phone = function () { return window.innerHeight > window.innerWidth; };
    if (off()) {
        setTimeout(function () {
            $('#intro .content .logo').height(0.48 * window.innerHeight);
            $('#intro .content .logo').width(0.48 * window.innerHeight);
            $('#intro .content .title').css('font-size',  '138px');
            $('#intro .content .text').css('font-size', '23px');
        }, 5);
        if (off()) $('#intro .content .nav').css('display', 'none');
    } else reset();
    if (phone()) {
        $('#intro .content .logo').height(0.43 * window.innerHeight);
        $('#intro .content .logo').width(0.43 * window.innerHeight);
        $('#intro .content .title').css('font-size',  '118px');
        $('#intro .content .text').css('font-size', '22.5px');
        $('#intro .content .text .space').html('<br/>');
    } else reset();
}

$(window).resize(size)
$(document).ready(load);
