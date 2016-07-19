
function load() {
    $('#intro .nav .image').click(function () {
        $('html, body').animate({
            scrollTop: ($('#hook').offset().top) + 'px'
        }, 700);
    });
}

$(document).ready(load);
