const swiperSliderInit = () => {

    let reachedEnd = false;
    const slider = '.swiper';

    if (document.querySelector(slider)) {
        const swiper = new Swiper(slider, {
            allowTouchMove: false,
            mousewheel: false,

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                400: {
                    slidesPerView: 1.8,
                },
                1100: {
                    slidesPerView: 2.5,
                },
                1300: {
                    slidesPerView: 3.5,
                },
                1660: {
                    slidesPerView: 4,
                },
                2000: {
                    slidesPerView: 5,
                }
            },
            on: {
                init: function () {
                    if (this.slides.length === 1) {
                        if (this.pagination && this.pagination.el) {
                            this.pagination.el.style.display = 'none';
                        }

                        if (this.navigation && this.navigation.nextEl && this.navigation.prevEl) {
                            this.navigation.nextEl.style.display = 'none';
                            this.navigation.prevEl.style.display = 'none';
                        }
                    }
                },
                reachEnd: function () {
                    document.querySelector('.compare-content__shadow--right').style.opacity = '0';
                    reachedEnd = true;
                },
                slideChangeTransitionStart: function () {
                    if (swiper.activeIndex === 0 && swiper.realIndex === 0) {
                        document.querySelector('.compare-content__shadow--left').style.opacity = '0';
                    } else {
                        document.querySelector('.compare-content__shadow--left').style.opacity = '1';
                    }

                    if (reachedEnd && swiper.activeIndex < swiper.previousIndex) {
                        document.querySelector('.compare-content__shadow--right').style.opacity = '1';
                        reachedEnd = false;
                    }
                },
            }
        });
    }

}

document.addEventListener('DOMContentLoaded', () => {
    swiperSliderInit();
});