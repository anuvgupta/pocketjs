
var _ = function (id) { return document.getElementById(id); };

function load() {
    size();
    $('#intro .content .nav .image').click(function () {
        $('#main').animate({
            scrollTop: $('#hook').offset().top + $('#main').scrollTop() + 'px'
        }, 700);
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
