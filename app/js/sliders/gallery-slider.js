document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 47,
        },
        1300: {
            slidesPerView: 3,
            spaceBetween: 47,
        },
      },
    });
  });
  