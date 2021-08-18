import $ from 'jquery';
import 'slick-carousel';

$(document).ready(function () {
    // const sandwich = function () {
    //     $(document).on('click', '.sandwich', function () {
    //         $(this).toggleClass('sandwich--active');
    //     });
    // };
    //
    // sandwich();
    popularCategoriesSlider();
});

const popularCategoriesSlider = function () {
    const sliderElement = $('.js-categories-prev');

    if ($(window).width() < 768 && !(sliderElement.hasClass('slick-initialized'))) {
        sliderElement.slick({
            slidesToShow: 2,
            slidesToScroll1: 1,
        })
    } else if ($(window).width() > 768 && sliderElement.hasClass(('slick-initialized'))) {
        sliderElement.slick('unslick')
    }
};

$(window).on('resize', function () {
    popularCategoriesSlider();
});