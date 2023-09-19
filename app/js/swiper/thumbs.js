let swiper1 = new Swiper(".swiper-thumbs-1", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
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
        }
    }
});
let swiper2 = new Swiper(".swiper-thumbs-1-top", {
    loop: true,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper1,
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
        }
    }
});
let swiper3 = new Swiper(".swiper-thumbs-2", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,

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
        }
    }
});
let swiper4 = new Swiper(".swiper-thumbs-2-top", {
    loop: true,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper3,
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
        }
    }
});

document.querySelectorAll(".appearance__slider").forEach(slider => {
    const sliderName = slider.getAttribute("data-slider");
    const thumbsTop = slider.querySelector(".swiper-thumbs-top");
    const thumbs = slider.querySelector(".swiper-thumbs");

    const thumbsSwiper = new Swiper(thumbs, {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });

    new Swiper(thumbsTop, {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: thumbsTop.querySelector(".swiper-button-next"),
            prevEl: thumbsTop.querySelector(".swiper-button-prev"),
        },
        thumbs: {
            swiper: thumbsSwiper,
        },
    });
});
