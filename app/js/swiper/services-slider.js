document.addEventListener("DOMContentLoaded", function () {
    let swiper = new Swiper(".services-swiper", {
        slidesPerView: 3.5,
        spaceBetween: 10,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            900: {
                slidesPerView: 2.8,
            },
            1920: {
                slidesPerView: 3.5,
            },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            init: function () {
                if (this.isBeginning) {
                    document.querySelector(".swiper-button-prev").style.display = "none";
                }
            },
            slideChange: function () {
                if (this.isBeginning) {
                    document.querySelector(".swiper-button-prev").style.display = "none";
                } else {
                    document.querySelector(".swiper-button-prev").style.display = "block";
                }
                if (this.isEnd) {
                    document.querySelector(".swiper-button-next").style.display = "none";
                } else {
                    document.querySelector(".swiper-button-next").style.display = "block";
                }
            },
        },
    });
});