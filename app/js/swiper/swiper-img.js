let swiper = new Swiper(".swiper-img", {
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
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