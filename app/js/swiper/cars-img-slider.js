document.addEventListener("DOMContentLoaded", function () {
    let swiper = new Swiper(".swiper-cars-img", {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 20,
    });
});