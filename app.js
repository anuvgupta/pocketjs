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
            .add('link button', 'demo')
            .add('link button', 'docs')
            .add('link button', 'source')
        )
        .add(Block('div', 'contact')
            .id('contact')
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
                .add('text', 'copyright')
                .add(Block('text', 'year').data((new Date()).getFullYear().toString()))
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
    // function for resizing elements
    var initialSize = window.innerHeight;
    var mobileAgent = function () {
        var check = false;
        (function (a) { if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    var mobileTabletAgent = function () {
        var check = false;
        (function (a) { if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    var size = function () {
        if (mobileTabletAgent())
            window.innerHeight = initialSize;
        // hide scrollbar
        var _main = body.child('main').node();
        _main.style.paddingRight = (_main.offsetWidth - _main.clientWidth) + 'px';
        // page positioning
        var introTop = mobileAgent() ? window.innerHeight * 2.125 : window.innerHeight * 2.05;
        body.child('main/intro')
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
                top: (introTop) + 'px',
                height:  '400px'
            })
        .sibling('links')
            .css({
                top: (introTop + 400) + 'px',
                height:  '100px'
            })
        .sibling('contact')
            .css({
                top: (introTop + 400 + 100) + 'px',
                height:  '400px'
            })
        ;

        // width based resizing
        if (window.innerWidth < 700) {
            // switch to mobile view
            body.child('main/intro/logo')
                .css('height', (0.43 * window.innerHeight) + 'px')
                .css('width', (0.43 * window.innerHeight) + 'px')
            .sibling('title')
                .css('font-size',  '118px')
            .sibling('text')
                .css('font-size', '22.5px')
                .child('space')
                    .html('<br/>')
            ;
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
                        top: (introTop + 400 + 280) + 'px',
                        height: '410px'
                    })
                .sibling('links')
                    .css('height', '280px')
            ;
            var children = body.child('main/links').children();
            for (var i in children)
                children[i].on('alt');
        } else {
            // or switch to regular view
            body.child('main/intro/logo')
                .css('height', (0.48 * window.innerHeight) + 'px')
                .css('width', (0.48 * window.innerHeight) + 'px')
            .sibling('nav')
                .css('display', 'block')
            .sibling('title')
                .css('font-size',  '138px')
            .sibling('text')
                .css('font-size', '23px')
                .child('space')
                    .html(' ')
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
                    top: (introTop + 400 + 100) + 'px',
                    height: '400px'
                })
                .sibling('links')
                    .css('height', '100px')
            ;
            var children = body.child('main/links').children();
            for (var i in children)
                children[i].on('reg');
        }

        // height based resizing
        if (window.innerHeight < 600) {
            body.child('main/intro/nav/text')
                    .css('display', 'none')
                .parent()
            .css({
                height: '50px',
                bottom: '12px'
            });
        } else {
            body.child('main/intro/nav/text')
                    .css('display', 'inline-block')
                .parent()
            .css({
                height: '70px',
                bottom: '12px'
            });
        }
        if (window.innerHeight < 550)
            body.child('main/intro/nav/down').css('transform', 'scale(0.8, 0.8)');
        else body.child('main/intro/nav/down').css('transform', 'scale(1, 1)');
        if (window.innerHeight < 450)
            body.child('main/intro/nav').css('display', 'none');
        else body.child('main/intro/nav').css('display', 'block');

        // mobile resizing
        if (mobileAgent()) {
            body.child('main/intro/title')
                .css('font-size', '75px')
            .sibling('text')
                .css('font-size', '10px')
            ;
        }
    }

    // make down arrow disappear when scrolled too far
    // $(document).scroll(function () {
    //     var nav = body.child('main/intro/nav');
    //     if (nav.$().offset().top - $(window).scrollTop() < window.innerHeight/3.2)
    //         nav.css('opacity', '0');
    //     else nav.css('opacity', '1');
    // });

    // load blockfile with jQuery
    body.load(function (b) {
        // load blocks into body
        b.fill(document.body);
        // resize on window resize
        $(window).resize(size);
        size(); // initial sizing
        setTimeout(function () {
            // display body
            b.css('opacity', '1');
            // fix background color
            setTimeout(function () {
                document.body.style.backgroundColor = '#262626';
            }, 400);
            // scroll to id in url
            var index = window.location.href.indexOf('#');
            if (index == -1) return false;
            var id = window.location.href.substring(index + 1);
            if (document.getElementById(id) == null) return false;
            $(document.body).animate({
                scrollTop: $('#' + id).offset().top + 'px'
            }, 700);
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
