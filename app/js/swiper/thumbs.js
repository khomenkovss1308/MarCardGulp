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
