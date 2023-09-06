document.addEventListener("DOMContentLoaded", function () {
    const iframeSrcMSC = "https://yandex.ru/map-widget/v1/?um=constructor%3A24eb5aa19462d467597bd7c35810e4f706bd5346e08afe7c149ab77f396691a3&amp;source=constructor";
    const iframeSrcSPB = "https://yandex.ru/map-widget/v1/?um=constructor%3Aac23b1f5649ac222ecb7ff04a148ceb3b6ebc5df7f32758967219f456f0a1ffb&amp;source=constructor";

    let swiper = new Swiper(".swiper-dealer", {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChange: function () {
                const activeSlide = swiper.activeIndex;
                let iframeSrc;

                if (activeSlide === 0) {
                    iframeSrc = iframeSrcMSC;
                } else if (activeSlide === 1) {
                    iframeSrc = iframeSrcSPB;
                }

                const iframe = document.getElementById(`slideMap`);
                iframe.src = iframeSrc;
            }
        }
    });

    const initSlider = () => {
        const iframe = document.getElementById(`slideMap`);
        iframe.src = iframeSrcMSC;
    }

    initSlider();
});