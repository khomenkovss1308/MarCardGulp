const sidebarFunctioning = () => {
    const headerMobileBtn = document.querySelector('.header__mobile-burger-menu');
    const sidebarCloseBtn = document.querySelector('.sidebar__close-btn');
    const sidebar = document.querySelector('.sidebar');
    headerMobileBtn.addEventListener('click', () => {
        sidebar.style.visibility = 'visible';
        sidebar.style.opacity = '1';
    });
    sidebarCloseBtn.addEventListener('click', () => {
        sidebar.style.visibility = 'hidden';
        sidebar.style.opacity = '0';
    });
}

const toggleDropdown = (dropdownId) => {
    let dropdown = document.getElementById("dropdown-" + dropdownId);
    let header = document.querySelector(".header");
    let dropdownWrapper = dropdown.previousSibling.previousSibling;

    if (dropdown.classList.contains("active")) {
        closeDropdown(dropdownId);
    } else {
        let activeDropdown = document.querySelector(".dropdown-content.active");
        
        if (activeDropdown) {
            closeDropdown(activeDropdown.id.split("-")[1]);
        }
    
        dropdown.classList.add("active");
        header.classList.add("dropdown-active");
        dropdownWrapper.style.visibility = 'visible';
        dropdownWrapper.style.opacity = '1';
    }
};

const closeDropdown = (dropdownId) => {
    let dropdown = document.getElementById("dropdown-" + dropdownId);
    let header = document.querySelector(".header");
    let dropdownWrapper = dropdown.previousSibling.previousSibling;

    dropdown.classList.remove("active");
    header.classList.remove("dropdown-active");
    dropdownWrapper.style.visibility = 'hidden';
    dropdownWrapper.style.opacity = '0';
};

document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
    dropdown.addEventListener('click', () => {
        closeDropdown(dropdown.id.split("-")[1]);
    });
});

const closeDropdownByWrapper = (dropdownId) => {
    let dropdown = document.getElementById("dropdown-" + dropdownId);
    let header = document.querySelector(".header");
    let dropdownWrapper = dropdown.previousSibling.previousSibling;

    dropdown.classList.remove("active");
    header.classList.remove("dropdown-active");
    dropdownWrapper.style.visibility = 'hidden';
    dropdownWrapper.style.opacity = '0';
}

const videPlayer = (videoContainers, video) => {
    const VIDEOCONTAINERS = document.querySelectorAll(videoContainers);
    const VIDEO = video;

    VIDEOCONTAINERS.forEach((videoContainer) => {
        let player = new Plyr(videoContainer.querySelector(VIDEO));

        videoContainer.addEventListener('ended', () => {
            videoContainer.querySelector('.video-icon').style.display = 'block';
        });

        videoContainer.addEventListener('mouseenter', () => {
            videoContainer.querySelector('.video-icon').style.opacity = '1';
        });

        videoContainer.addEventListener('mouseleave', () => {
            if (VIDEO.paused || VIDEO.ended) {
                videoContainer.querySelector('.video-icon').style.opacity = '1';
            } else {
                videoContainer.querySelector('.video-icon').style.opacity = '0';
            }
        });
    });
}

const toggleText = () => {
    const containers = document.querySelectorAll('.toggle-container');

    containers.forEach(container => {
        const btnReadMore = container.querySelector('.btn-read-more');
        const btnCollapse = container.querySelector('.btn-collapse');
        const target = container.querySelector('.toggle-content');
        const maxHeight = parseInt(target.getAttribute('data-max-height'));

        if (!btnReadMore || !btnCollapse || !target) return;

        btnReadMore.addEventListener('click', () => {
            target.style.maxHeight = '1000px';
            btnReadMore.style.display = 'none';
            btnCollapse.style.display = 'flex';
        });

        btnCollapse.addEventListener('click', () => {
            target.style.maxHeight = `${maxHeight}px`;
            btnCollapse.style.display = 'none';
            btnReadMore.style.display = 'flex';
            target.scrollTop = 0;
        });

        const targetHeight = target.scrollHeight;
        if (targetHeight <= maxHeight) {
            btnReadMore.style.display = 'none';
            btnCollapse.style.display = 'none';
        }
    });
}

const toggleSubMenu = () => {

    const listItems = document.querySelectorAll(".navigation-list__item");
    const subListItems = document.querySelectorAll(".navigation-sublist__item");
    const titleName = document.querySelector(".sidebar__navigation-title");
    const sidebarBottom = document.querySelector(".sidebar__bottom");
    const sidebarTop = document.querySelector(".sidebar__top");
    const sidebarTopTel = document.querySelector(".sidebar__group-tel");
    const sidebarTopAddress = document.querySelector(".sidebar__group-address");
    const sidebarBack = document.querySelector(".sidebar__back");
    const sidebarBackBtn = sidebarBack.querySelector("button");

    if (window.innerWidth <= 1080) {
        const handleMenuItemClick = (event, clickedItem, subListToShow, menu) => {
            if (clickedItem.querySelector(subListToShow)) {
                event.preventDefault();
                event.stopPropagation();


                sidebarBottom.style.display = "none";
                sidebarTopTel.style.display = "none";
                sidebarTopAddress.style.display = "none";
                sidebarTop.style.marginBottom = "0";

                menu.forEach(function (item) {
                    if (item !== clickedItem) {
                        item.style.display = "none";
                    } else {
                        clickedItem.querySelector("a").style.display = "none";
                        clickedItem.querySelectorAll(":scope > img").forEach(img => img.style.display = "none");
                        clickedItem.style.paddingBottom = "0";
                        clickedItem.style.borderBottom = "none";
                        clickedItem.querySelector(subListToShow).style.display = "block";
                    }
                });

                titleName.textContent = clickedItem.querySelector("a").textContent;

                const sidebarComeBack = () => {

                }

                if (sidebarBackBtn) {
                    sidebarBackBtn.addEventListener('click', sidebarComeBack);
                }
            }
        }

        listItems.forEach(function (item) {
            item.addEventListener("click", function (event) {
                handleMenuItemClick(event, item, '.navigation-sublist-group', listItems);
            });
        });

        subListItems.forEach(function (submenuItem) {
            submenuItem.addEventListener("click", function (event) {
                handleMenuItemClick(event, submenuItem, '.navigation-sublist__item-content', subListItems);
            });
        });
    }


}

const compareTableAutoHeight = () => {
    const leftThead = document.querySelector('.compare-content__left thead');
    const rightTheads = document.querySelectorAll('.compare-content__right thead');

    // Проверяем существование leftThead
    if (leftThead) {
        // Находим максимальную высоту среди всех thead в правом блоке
        let maxTheadHeight = 0;

        rightTheads.forEach(rightThead => {
            const rightTheadHeight = rightThead.clientHeight;
            maxTheadHeight = Math.max(maxTheadHeight, rightTheadHeight);
        });

        // Применяем максимальную высоту к thead в левом блоке
        leftThead.style.height = maxTheadHeight + 'px';
    }

    const leftRows = document.querySelectorAll('.compare-content__left tbody tr');
    const swiperSlides = document.querySelectorAll('.swiper-slide');

    // Создаем массив для хранения максимальных высот для каждого tr
    const maxHeights = Array.from({
        length: leftRows.length
    }, () => 0);

    swiperSlides.forEach(slide => {
        const rightRows = slide.querySelectorAll('.compare-content__right tbody tr');

        rightRows.forEach((rightRow, i) => {
            const leftRowHeight = leftRows[i].clientHeight;
            const rightRowHeight = rightRow.clientHeight;

            maxHeights[i] = Math.max(maxHeights[i], leftRowHeight, rightRowHeight);
        });
    });

    // Применяем максимальные высоты к tr в обоих блоках
    leftRows.forEach((leftRow, i) => {
        leftRow.style.height = maxHeights[i] + 'px';
    });

    swiperSlides.forEach(slide => {
        const rightRows = slide.querySelectorAll('.compare-content__right tbody tr');

        rightRows.forEach((rightRow, i) => {
            rightRow.style.height = maxHeights[i] + 'px';
        });
    });
}

const compareContentWidth = () => {
    const getCompareContentLeftWidth = () => {
        if (window.innerWidth > 1100) {
            return 406;
        } else if (window.innerWidth <= 1100 && window.innerWidth > 850) {
            return 370;
        } else if (window.innerWidth <= 850 && window.innerWidth > 700) {
            return 300;
        } else if (window.innerWidth <= 700 && window.innerWidth > 500) {
            return 200;
        } else {
            return 170;
        }
    }

    const compareContent = document.querySelector('.compare-content');

    if (compareContent) {
        const compareContentRight = document.querySelector('.compare-content__right');
        const compareContentWidth = compareContent.offsetWidth;

        compareContentRight.style.width = (compareContentWidth - getCompareContentLeftWidth()) + 'px';
    }
}

const appearanceBtnup = () => {
    const btnUp = {
        el: document.querySelector('.btn-up'),
        show() {
            // удалим у кнопки класс btn-up_hide
            this.el.classList.remove('btn-up_hide');
        },
        hide() {
            // добавим к кнопке класс btn-up_hide
            this.el.classList.add('btn-up_hide');
        },
        addEventListener() {
            // при прокрутке содержимого страницы
            window.addEventListener('scroll', () => {
                // определяем величину прокрутки
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
                scrollY > 400 ? this.show() : this.hide();
            });

            // при нажатии на кнопку .btn-up
            this.el.onclick = () => {
                // переместим в начало страницы
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    }
    btnUp.addEventListener();
}

const setWrapperCompareWidth = () => {
    if ( window.innerWidth < 1660 ) {
        const wrapper = document.querySelector('.wrapper');
        const screenWidth = window.innerWidth;
    
        const wrapperCompare = document.querySelector('.wrapper-compare');
        wrapperCompare.style.width = `${wrapper.offsetWidth + (screenWidth-wrapper.offsetWidth) / 2}px`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    videPlayer(".video__container", ".video");

    toggleText();
    appearanceBtnup();

    toggleSubMenu();
    sidebarFunctioning();

    compareContentWidth();
    compareTableAutoHeight();

    setWrapperCompareWidth();

    window.addEventListener('resize', compareContentWidth);
    window.addEventListener('resize', compareTableAutoHeight);
    window.addEventListener('resize', setWrapperCompareWidth);
});