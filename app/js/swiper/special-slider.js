document.addEventListener("DOMContentLoaded", function () {
    let swiper = new Swiper(".swiper-special", {
        slidesPerView: 1,
        spaceBetween: 40,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});