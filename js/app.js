
var _ = function (id) { return document.getElementById(id); };

function load() {
    _('main').style.paddingRight = (_('main').offsetWidth - _('main').clientWidth) + 'px';
    var hookTop = $('#hook').offset().top;
    $('#intro .nav .image').click(function () {
        $('#main').animate({
            //scrollTop: Math.abs($('#hook').offset().top - $('#main').scrollTop()) + 'px'
            scrollTop: hookTop + 'px'
        }, 700);
    });
}

$(document).ready(load);
