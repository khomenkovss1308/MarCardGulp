document.addEventListener("DOMContentLoaded", function () {

    let start = false;

    let swiper = new Swiper(".swiper-tabs", {
        freeMode: true,
        on: {
            sliderFirstMove: function() {
                if (start){
                    document.querySelector('.tabs__shadow--left').style.opacity = '0';
                    start = false;
                } else {
                    document.querySelector('.tabs__shadow--left').style.opacity = '1';
                    start = true;
                }
            },
        }
    });

    if (window.innerWidth >= 800) {
        swiper.destroy();
    }
});