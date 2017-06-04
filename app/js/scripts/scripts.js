/**
 * Created by alexrewrew on 15.02.17.
 */
$(document).ready(function () {

    $('.slider-1').slick({
        nextArrow: '<div class="right-arrow pulse"><i class="fa fa-angle-right"></i></div>',
        prevArrow: '<div class="left-arrow pulse"><i class="fa fa-angle-left"></i></div>'
    });

    $('.info-button').click(function () {
        $('.info-pop').toggleClass('visibility')
    });

    $('.slider-2').find('video').get(0).play();


    //responsive scripts
    if (window.matchMedia('(max-width: 767px)').matches) {
        
    }
})


