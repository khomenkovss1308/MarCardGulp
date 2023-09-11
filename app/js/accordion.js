document.addEventListener("DOMContentLoaded", () => {
    class EquipmentAccordion {
        constructor(selector) {
            this.element = document.querySelector(selector);
            if (this.element) {
                this._el = typeof selector === 'string' ? document.querySelector(selector) : selector;
                this.addEventListener();
            }
        }
        addEventListener() {
            this._el.addEventListener('click', (e) => {
                const elHeader = e.target.closest('.accordion__header');
                if (!elHeader) {
                    return;
                }
                this.toggle(elHeader.parentElement);
            });
        }
        show(el) {
            const elHeader = el.querySelector('.accordion__header');
            if (!elHeader) {
                return;
            }
            const elBody = el.querySelector('.accordion__body');
            if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
                return;
            }
            elBody.style.display = 'block';
            const height = elBody.offsetHeight;
            elBody.style.height = 0;
            elBody.style.overflow = 'hidden';
            elBody.style.transition = `height 350ms ease`;
            elBody.classList.add('collapsing');
            el.classList.add('accordion__item_slidedown');
            elBody.offsetHeight;
            elBody.style.height = `${height}px`;
            window.setTimeout(() => {
                elBody.classList.remove('collapsing');
                el.classList.remove('accordion__item_slidedown');
                elBody.classList.add('collapse');
                el.classList.add('accordion__item_show');
                elBody.style.display = '';
                elBody.style.height = '';
                elBody.style.transition = '';
                elBody.style.overflow = '';

                el.style.height = '100%';
                elHeader.style.color = 'white';
                elHeader.style.background = 'linear-gradient(88deg, #2775B8 0%, #44A8FF 99.66%)';
                const icon = elHeader.querySelector('.icon');
                if (icon) {
                    icon.style.backgroundImage = 'url(../images/icons/default/minus.svg)';
                }
            }, 350);
        }
        hide(el) {
            const elHeader = el.querySelector('.accordion__header');
            if (!elHeader) {
                return;
            }
            const elBody = el.querySelector('.accordion__body');
            if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
                return;
            }
            elBody.style.height = `${elBody.offsetHeight}px`;
            elBody.offsetHeight;
            elBody.style.display = 'block';
            elBody.style.height = 0;
            elBody.style.overflow = 'hidden';
            elBody.style.transition = `height 350ms ease`;
            elBody.classList.remove('collapse');
            el.classList.remove('accordion__item_show');
            elBody.classList.add('collapsing');
            window.setTimeout(() => {
                elBody.classList.remove('collapsing');
                elBody.classList.add('collapse');
                elBody.style.display = '';
                elBody.style.height = '';
                elBody.style.transition = '';
                elBody.style.overflow = '';

                el.style.height = '';
                elHeader.style.color = '';
                elHeader.style.background = '';
                const icon = elHeader.querySelector('.icon');
                if (icon) {
                    icon.style.backgroundImage = 'url(../images/icons/default/plus.svg)';
                }
            }, 350);
        }
        toggle(el) {
            el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
        }
    }

    
    const equipmentAccordions = [
        "#equipment-1",
        "#equipment-2",
        "#equipment-3",
        "#equipment-4",
        "#equipment-5"
    ];

    equipmentAccordions.forEach((selector) => {
        new EquipmentAccordion(selector);
    });

    const equipmentListItems = document.querySelectorAll('.equipment-list__item');

    equipmentListItems.forEach((item) => {
        let isExpanded = false;
        item.addEventListener('click', () => {
            isExpanded = !isExpanded;
            item.style.transition = 'flex-basis 0.35s ease-in-out';

            item.style.flexBasis = isExpanded ? '100%' : '49%';
            if (window.innerWidth <= 768) {
                item.style.flexBasis =  isExpanded ? '100%' : '100%'
            }

            const accordionHeader = item.querySelector('.accordion__header');
            if (accordionHeader) {
                accordionHeader.style.transition = 'background-color 0.35s ease-in-out, color 0.35s ease-in-out';
                accordionHeader.style.color = isExpanded ? 'white' : '';
                accordionHeader.style.background = isExpanded ? 'linear-gradient(88deg, #2775B8 0%, #44A8FF 99.66%)' : '';
            }
        });
    });
    

    class ItcAccordion {
        constructor(selector, config) {
            this.element = document.querySelector(selector);
            if (this.element) {
                this._el = typeof selector === 'string' ? document.querySelector(selector) : selector;
                const defaultConfig = {
                    alwaysOpen: true,
                    duration: 350
                };
                this._config = Object.assign(defaultConfig, config);
                this.addEventListener();
            }
        }
        addEventListener() {
            this._el.addEventListener('click', (e) => {
                const elHeader = e.target.closest('.accordion__header');
                if (!elHeader) {
                    return;
                }
                if (!this._config.alwaysOpen) {
                    const elOpenItem = this._el.querySelector('.accordion__item_show');
                    if (elOpenItem) {
                        elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
                    }
                }
                this.toggle(elHeader.parentElement);
            });
        }
        show(el) {
            const elBody = el.querySelector('.accordion__body');
            if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
                return;
            }
            elBody.style.display = 'block';
            const height = elBody.offsetHeight;
            elBody.style.height = 0;
            elBody.style.overflow = 'hidden';
            elBody.style.transition = `height ${this._config.duration}ms ease`;
            elBody.classList.add('collapsing');
            el.classList.add('accordion__item_slidedown');
            elBody.offsetHeight;
            elBody.style.height = `${height}px`;
            window.setTimeout(() => {
                elBody.classList.remove('collapsing');
                el.classList.remove('accordion__item_slidedown');
                elBody.classList.add('collapse');
                el.classList.add('accordion__item_show');
                elBody.style.display = '';
                elBody.style.height = '';
                elBody.style.transition = '';
                elBody.style.overflow = '';
            }, this._config.duration);
        }
        hide(el) {
            const elBody = el.querySelector('.accordion__body');
            if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
                return;
            }
            elBody.style.height = `${elBody.offsetHeight}px`;
            elBody.offsetHeight;
            elBody.style.display = 'block';
            elBody.style.height = 0;
            elBody.style.overflow = 'hidden';
            elBody.style.transition = `height ${this._config.duration}ms ease`;
            elBody.classList.remove('collapse');
            el.classList.remove('accordion__item_show');
            elBody.classList.add('collapsing');
            window.setTimeout(() => {
                elBody.classList.remove('collapsing');
                elBody.classList.add('collapse');
                elBody.style.display = '';
                elBody.style.height = '';
                elBody.style.transition = '';
                elBody.style.overflow = '';
            }, this._config.duration);
        }
        toggle(el) {
            el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
        }
        
    }

    const accordions = [
        "#accordion-one",
        "#accordion-two",
        "#accordion-footer",
        "#picking-1",
        "#picking-2",
        "#picking-3",
        "#picking-4",
        "#picking-5",
    ];

    accordions.forEach((selector) => {
        new ItcAccordion(selector);
    });
});