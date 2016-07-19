
var _ = function (id) { return document.getElementById(id); };

function load() {
    _('main').style.paddingRight = (_('main').offsetWidth - _('main').clientWidth) + 'px';
    $('#intro .nav .image').click(function () {
        $('#main').animate({
            scrollTop: $('#hook').offset().top + $('#main').scrollTop() + 'px'
        }, 700);
    });
}

$(document).ready(load);
