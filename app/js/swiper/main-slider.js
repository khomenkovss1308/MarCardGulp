document.addEventListener("DOMContentLoaded", function () {
    let swiper = new Swiper(".swiper-main", {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination-main',
            clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 50,
    });
});