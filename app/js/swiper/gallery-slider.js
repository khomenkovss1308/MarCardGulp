document.addEventListener("DOMContentLoaded", function () {
    let reachedEnd = false;
    const shadowRight = '.compare-content__shadow--right';
    const shadowLeft = '.compare-content__shadow--left';
    
    let swiper = new Swiper(".swiper-container", {
        allowTouchMove: false,
        mousewheel: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
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
                slidesPerView: 4,
                spaceBetween: 47,
            },
        },
        on: {
            reachEnd: function () {
                if (document.querySelector(shadowRight)){
                    document.querySelector(shadowRight).style.opacity = '0';
                    reachedEnd = true;
                }
            },
            slideChangeTransitionStart: function () {
                if (document.querySelector(shadowRight) && document.querySelector(shadowLeft)){
                    if (swiper.activeIndex === 0 && swiper.realIndex === 0) {
                        document.querySelector(shadowLeft).style.opacity = '0';
                    } else {
                        document.querySelector(shadowLeft).style.opacity = '1';
                    }
    
                    if (reachedEnd && swiper.activeIndex < swiper.previousIndex) {
                        document.querySelector(shadowRight).style.opacity = '1';
                        reachedEnd = false;
                    }
                }
            },
        }
    });
});