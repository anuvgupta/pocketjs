var body;
body = Block('div', 'app')
    // .add(Block('div', 'menu')
    //     .add(Block('block', 'github')
    //         .add(Block('a', 'link')
    //             .add('image', 1)
    //             .add('text', 1)
    //         )
    //         .on('mouseenter', function () {
    //             body.child('menu/github')
    //                     .css('opacity', '0.85')
    //                     .child('link/text')
    //                         .css('opacity', '1')
    //             ;
    //         })
    //         .on('mouseleave', function () {
    //             body.child('menu/github')
    //                 .css('opacity', '0.6')
    //                 .child('link/text')
    //                     .css('opacity', '0')
    //             ;
    //         })
    //     )
    //     .add(Block('div', 'docs')
    //
    //     )
    // )
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
                        .html('<a class="github-button" href="https://github.com/anuvgupta" data-style="mega" data-count-href="/anuvgupta/followers" data-count-api="/users/anuvgupta#followers" data-count-aria-label="# followers on GitHub" aria-label="Follow @anuvgupta on GitHub">Follow Me</a>')
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
                    .html('<a class="github-button" href="https://github.com/anuvgupta/pocketjs" data-icon="octicon-star" data-style="mega" data-count-href="/anuvgupta/pocketjs/stargazers" data-count-api="/repos/anuvgupta/pocketjs#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star anuvgupta/pocketjs on GitHub">Star</a>&nbsp;&nbsp;', true)
                    .html('<a class="github-button" href="https://github.com/anuvgupta/pocketjs/fork" data-icon="octicon-repo-forked" data-style="mega" data-count-href="/anuvgupta/pocketjs/network" data-count-api="/repos/anuvgupta/pocketjs#forks_count" data-count-aria-label="# forks on GitHub" aria-label="Fork anuvgupta/pocketjs on GitHub">Fork</a>', true)
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
            )
        )
    )
;



$(document).ready(function () {
    var scroll = function () {
        var index = window.location.href.indexOf('#');
        if (index == -1) return false;
        var id = window.location.href.substring(index + 1);
        if (document.getElementById(id) == null) return false;
        $(document.body).animate({
            scrollTop: $('#' + id).offset().top + 'px'
        }, 700);
    };
    var size = function () {
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
                .child('space').html(' ');
            body.child('main/contact/footer/breakB')
                    .html(' ')
                    .parent()
                .sibling('main')
                    .css('padding-bottom', '0px')
                    .parent()
                .css('top', (window.innerHeight * 2.05 + 400 + 100) + 'px')
                .sibling('links')
                    .css('height', '100px')
                    .css('top', (window.innerHeight * 2.05 + 400) + 'px')
            ;
            var children = body.child('main/links').children();
            for (var i in children)
                children[i].on('reg');
        };
        var off = function () {
            return intro.child('text').$().offset().top + 24 + parseFloat(intro.child('text').css('font-size')) > intro.child('nav').$().offset().top;
        };
        var phone = function () {
            return (window.innerHeight > window.innerWidth) || (window.innerWidth < 700);
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
                .child('space').html('<br/>');
                body.child('main/contact/footer/breakB')
                        .html('<br/>')
                        .parent()
                    .sibling('main')
                        .css('padding-bottom', '20px')
                        .parent()
                    .css('top', (window.innerHeight * 2.05 + 400 + 280) + 'px')
                    .sibling('links')
                        .css('height', '280px')
                        .css('top', (window.innerHeight * 2.05 + 400) + 'px')
                ;
                var children = body.child('main/links').children();
                for (var i in children)
                    children[i].on('alt');
        } else reset();
    }
    $(document).scroll(function () {
        var nav = body.child('main/intro/nav');
        if (nav.$().offset().top - $(window).scrollTop() < window.innerHeight/3.2)
            nav.css('opacity', '0');
        else nav.css('opacity', '1');
    });

    body.load(function (b) {
        b.fill(document.body);
        size();
        $(window).resize(size);
        setTimeout(function () {
            b.css('opacity', '1');
            scroll();
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
});
