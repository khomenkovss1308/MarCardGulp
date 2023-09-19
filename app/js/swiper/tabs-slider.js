document.addEventListener("DOMContentLoaded", function () {

    let start = false;

    let swiper = new Swiper(".swiper-tabs", {
        freeMode: true,
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