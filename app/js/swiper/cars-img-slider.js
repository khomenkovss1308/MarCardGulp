document.addEventListener("DOMContentLoaded", function () {
    let swiper = new Swiper(".swiper-cars-img", {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 20,
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
});
