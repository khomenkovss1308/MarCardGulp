const sidebarFunctioning = () => {
    const headerMobileBtn = document.querySelector('.header__mobile-burger-menu');
    const sidebarCloseBtn = document.querySelector('.sidebar__close-btn');
    const sidebar = document.querySelector('.sidebar');
    headerMobileBtn.addEventListener('click', () => {
        sidebar.style.display = 'block';
    });
    sidebarCloseBtn.addEventListener('click', () => {
        sidebar.style.display = 'none';
    });
}

const toggleDropdown = (dropdownId) => {
    let dropdown = document.getElementById("dropdown-" + dropdownId);
    let header = document.querySelector(".header");
    let mainContent = document.querySelector(".main-content");

    if (dropdown.classList.contains("active")) {
        dropdown.classList.remove("active");
        header.classList.remove("dropdown-active");
        mainContent.classList.remove("dropdown-active");
    } else {
        let activeDropdown = document.querySelector(".dropdown-content.active");
        if (activeDropdown) {
            activeDropdown.classList.remove("active");
        }
        dropdown.classList.add("active");
        header.classList.add("dropdown-active");
        mainContent.classList.add("dropdown-active");
    }
};

const closeDropdown = (dropdownId) => {
    let dropdown = document.getElementById("dropdown-" + dropdownId);
    let header = document.querySelector(".header");
    let mainContent = document.querySelector(".main-content");

    dropdown.classList.remove("active");
    header.classList.remove("dropdown-active");
    mainContent.classList.remove("dropdown-active");
};

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

const handleToggleText = (containerSelector, subtitleSelector, readMoreSelector, collapseSelector, maxHeight) => {
    const container = document.querySelector(containerSelector);
    const subtitle = container && container.querySelector(subtitleSelector);
    const btnReadMore = container && container.querySelector(readMoreSelector);
    const btnCollapse = container && container.querySelector(collapseSelector);

    if (!container || !subtitle || !btnReadMore || !btnCollapse) {
        return;
    }

    btnReadMore.addEventListener('click', () => {
        subtitle.style.maxHeight = subtitle.scrollHeight + 'px';
        btnReadMore.style.display = 'none';
        btnCollapse.style.display = 'flex';
    });

    btnCollapse.addEventListener('click', () => {
        subtitle.style.maxHeight = maxHeight;
        btnCollapse.style.display = 'none';
        btnReadMore.style.display = 'flex';
        subtitle.scrollTop = 0;
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

                // sidebarBack.style.display = "block";
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

const swiperSliderInit = () => {

    let reachedEnd = false;

    const swiper = new Swiper('.swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            320: {
                slidesPerView: 1.8,
            },
            1100: {
                slidesPerView: 2.5,
            },
            1300: {
                slidesPerView: 3.5,
            }
        },
        on: {
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

const compareTableAutoHeight = () => {
    const leftThead = document.querySelector('.compare-content__left thead');
    const rightTheads = document.querySelectorAll('.compare-content__right thead');

    // Находим максимальную высоту среди всех thead в правом блоке
    let maxTheadHeight = 0;

    rightTheads.forEach(rightThead => {
        const rightTheadHeight = rightThead.clientHeight;
        maxTheadHeight = Math.max(maxTheadHeight, rightTheadHeight);
    });

    // Применяем максимальную высоту к thead в левом блоке
    leftThead.style.height = maxTheadHeight + 'px';


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

        if (window.innerWidth > 1100){
            const compareContentLeftWidth = 406;
            return compareContentLeftWidth;
        }

        if (window.innerWidth <= 1100 && window.innerWidth > 850){
            const compareContentLeftWidth = 370;
            return compareContentLeftWidth;
        } 

        if (window.innerWidth <= 850 && window.innerWidth > 700) {
            const compareContentLeftWidth = 300;
            return compareContentLeftWidth;
        }

        if (window.innerWidth <= 700 && window.innerWidth > 500) {
            const compareContentLeftWidth = 200;
            return compareContentLeftWidth;
        }

        if (window.innerWidth <= 500) {
            const compareContentLeftWidth = 170;
            return compareContentLeftWidth;
        }
        
    }

    const compareContent = document.querySelector('.compare-content');

    const compareContentRight = document.querySelector('.compare-content__right');
    const compareContentWidth = compareContent.offsetWidth;

    compareContentRight.style.width = (compareContentWidth - getCompareContentLeftWidth()) + 'px';

    console.log(compareContentRight.style.width);
}



document.addEventListener('DOMContentLoaded', () => {
    //call function videoPlayer
    videPlayer(".video__container", ".video");

    //call fuction handleToggleText
    handleToggleText('.seo-block__content', '.seo-block__subtitle', '#btn-read-more-seo', '#btn-collapse-seo', '208px');
    handleToggleText('.services-rent__benefit-container', '.services-rent__benefit', '#btn-read-more-rent', '#btn-collapse-rent', '138px');

    handleToggleText('.service__maintenance-collapse__container', '.service__maintenance-collapse__content', '#btn-read-more-service', '#btn-collapse-service', '290px');
    handleToggleText('.taxi__benifit-container-1', '.taxi__benifit-list-1', '#btn-read-more-taxi-1', '#btn-collapse-taxi-1', '138px');
    handleToggleText('.taxi__benifit-container-2', '.taxi__benifit-list-2', '#btn-read-more-taxi-2', '#btn-collapse-taxi-2', '138px');

    sidebarFunctioning();
    toggleSubMenu();
    swiperSliderInit();

    compareContentWidth();
    compareTableAutoHeight();

    window.addEventListener('resize', compareContentWidth);
    window.addEventListener('resize', compareTableAutoHeight);
});