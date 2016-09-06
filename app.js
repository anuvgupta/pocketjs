var body;
body = Block('div', 'app')
    .add(Block('div', 'main')
        .add(Block('block', 'intro')
            .id('intro')
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
                        scrollTop: body.child('main/hook').$().offset().top /*+ $(document.body).scrollTop()*/ + 'px'
                    }, 700);
                })
            )
        )
        .add(Block('div', 'hook')
            .id('hook')
            .add(Block('panel', 'left')
                .add(Block('div', 1)
                    .class('code_container')
                )
            )
            .add(Block('panel', 'middle')
                .add('chat', 1)
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
        .add(Block('block', 'info')
            .id('info')
            .add('text', 'title')
        )
        .add(Block('block', 'links')
            .id('links')
            .css('top', (window.innerHeight * 2.05 + 400) + 'px')
            .add('link button', 'demo')
            .add('link button', 'docs')
            .add('link button', 'source')
        )
        .add(Block('div', 'contact')
            .id('contact')
            .css('top', (window.innerHeight * 2.05 + 400 + 100) + 'px')
            .add(Block('block', 'main')
                .add(Block('block', 'author')
                    .add(Block('div', 'link')
                        .add(Block('a', 1)
                            .add('image', 1)
                            .add('text', 1)
                        )
                        .on('mouseenter', function () {
                            body.child('main/contact/main/author/link').css('background-color', '#222222');
                        })
                        .on('mouseleave', function () {
                            body.child('main/contact/main/author/link').css('background-color', '#1F1F1F');
                        })
                    )
                    .add('text', 1)
                    .add(Block('div', 'github')
                        .bind('html', function (html) {
                            body.child('main/contact/main/author/github').html(html);
                        })
                    )
                )
                .add('break')
                .add(Block('div', 'email')
                    .add('text', 1)
                    .add(Block('a', 'link')
                        .add('text', 1)
                    )
                )
                .add(Block('div', 'license')
                    .add('text', 'name')
                    .add('text', 1)
                    .add(Block('a', 'link')
                        .add('text', 1)
                    )
                )
                .add(Block('div', 'github')
                    .bind('html', function (html) {
                        body.child('main/contact/main/github').html(html.A + '&nbsp;&nbsp;' + html.B);
                    })
                )
            )
            .add(Block('block', 'footer')
                .add(Block('text', 'copyright')
                    .html('Copyright &copy;')
                )
                .add('text', 'breakA')
                .add('text', 'textA')
                .add('text', 'breakB')
                .add('text', 'textB')
                .add('text', 'breakC')
            )
        )
    )
;



$(document).ready(function () {
    var size = function () {
        var _main = body.child('main').node();
        _main.style.paddingRight = (_main.offsetWidth - _main.clientWidth) + 'px';
        var intro = body.child('main/intro');
        intro
            .css({
                top: '0',
                height: window.innerHeight + 'px'
            })
        .sibling('hook')
            .css({
                top: window.innerHeight + 'px',
                height:  window.innerHeight + 'px'
            })
        .sibling('info')
            .css({
                top: (window.innerHeight * 2.05) + 'px',
                height:  '400px'
            })
        .sibling('links')
            .css({
                top: (window.innerHeight * 2.05 + 400) + 'px',
                height:  '100px'
            })
        .sibling('contact')
            .css({
                top: (window.innerHeight * 2.05 + 400 + 100) + 'px',
                height:  '400px'
            })
        ;
        var reset = function () {
            intro.child('logo')
                .css('height', (0.48 * window.innerHeight) + 'px')
                .css('width', (0.48 * window.innerHeight) + 'px')
            .sibling('nav')
                .css('display', 'block')
            .sibling('title')
                .css('font-size',  '138px')
            .sibling('text')
                .css('font-size', '23px')
                .child('space').html(' ')
            ;
            body.child('main/contact/footer/breakB')
                        .html(' ')
                    .sibling('breakC')
                        .html('')
                    .parent()
                .css('bottom', '1px')
                .sibling('main')
                    .css('padding-bottom', '0px')
                    .parent()
                .css({
                    top: (window.innerHeight * 2.05 + 400 + 100) + 'px',
                    height: '400px'
                })
                .sibling('links')
                    .css('height', '100px')
            ;
            var children = body.child('main/links').children();
            for (var i in children)
                children[i].on('reg');
        };
        var phone = function () {
            // return (window.innerHeight > window.innerWidth) || (window.innerWidth < 700);
            return (window.innerWidth < 700);
        };
        if (phone()) {
            intro.child('logo')
                .css('height', (0.43 * window.innerHeight) + 'px')
                .css('width', (0.43 * window.innerHeight) + 'px')
            .sibling('title')
                .css('font-size',  '118px')
            .sibling('text')
                .css('font-size', '22.5px')
                .child('space').html('<br/>');
                body.child('main/contact/footer/breakB')
                            .html('<br/>')
                        .sibling('breakC')
                            .html('<br/>')
                        .parent()
                    .css('bottom', '8px')
                    .sibling('main')
                        .css('padding-bottom', '20px')
                        .parent()
                        .css({
                            top: (window.innerHeight * 2.05 + 400 + 280) + 'px',
                            height: '410px'
                        })
                    .sibling('links')
                        .css('height', '280px')
                ;
                var children = body.child('main/links').children();
                for (var i in children)
                    children[i].on('alt');
        } else reset();
    }

    // make down arrow disappear when scrolled too far
    // $(document).scroll(function () {
    //     var nav = body.child('main/intro/nav');
    //     if (nav.$().offset().top - $(window).scrollTop() < window.innerHeight/3.2)
    //         nav.css('opacity', '0');
    //     else nav.css('opacity', '1');
    // });

    // convenience function for scrolling to div by id
    var scroll = function () {
        var index = window.location.href.indexOf('#');
        if (index == -1) return false;
        var id = window.location.href.substring(index + 1);
        if (document.getElementById(id) == null) return false;
        $(document.body).animate({
            scrollTop: $('#' + id).offset().top + 'px'
        }, 700);
    };
    // load blockfile
    body.load(function (b) {
        b.fill(document.body);
        size();
        $(window).resize(size);
        setTimeout(function () {
            b.css('opacity', '1');
            scroll();
        }, 10);
    }, 'app', 'jQuery');
    // load code html
    $.ajax({
        url: 'code/php.txt',
        dataType: 'text',
        success: function (data) {
            body.child('main/hook/left/div').html(data);
        }
    });
    $.ajax({
        url: 'code/js.txt',
        dataType: 'text',
        success: function (data) {
            body.child('main/hook/right/div').html(data);
        }
    });
});
