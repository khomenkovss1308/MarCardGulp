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
    const sidebarTopTel = document.querySelector(".sidebar__group-tel");
    const sidebarTopAddress = document.querySelector(".sidebar__group-address");
    const sidebarTop = document.querySelector(".sidebar__top");
    const sidebarBack = document.querySelector(".sidebar__back");
    const sidebarBackBtn = sidebarBack.querySelector(".sidebar__back-btn");

    let menuStack = [];

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
                        menuStack.push(item);
                    }
                });

                titleName.textContent = clickedItem.querySelector("a").textContent;
            };
        };

        const handleBackButtonClick = () => {
            if (menuStack.length > 0) {
                const currentItem = menuStack.pop();
                const anchor = currentItem.querySelector("a");
                const iconArrow = currentItem.querySelector(".icon-arrow");
                subListItems.forEach(item => {
                    item.style.display = "flex";
                    item.querySelector("a").style.display = "block";
                    item.querySelector("img").style.display = "block";
                    item.style.borderBottom = "1px solid #F1F1F1";
                    item.style.paddingBottom = "14px";
                });
        
                if (anchor && iconArrow) {
                    anchor.style.display = "block";
                    iconArrow.style.display = "block";
                }
        
                const navigationSublistGroup = currentItem.querySelector(".navigation-sublist-group");
                if (navigationSublistGroup) {
                    navigationSublistGroup.style.display = "block";
                }
        
                const navigationSublistContent = currentItem.querySelector(".navigation-sublist__item-content");
                if (navigationSublistContent) {
                    navigationSublistContent.style.display = "none";
                }
        
                if (menuStack.length > 0) {
                    const previousItem = menuStack[menuStack.length - 1];
                    const prevAnchor = previousItem.querySelector("a");
                    if (prevAnchor) {
                        titleName.textContent = prevAnchor.textContent;
                    }
                } else {
                    titleName.textContent = "Меню навигации";
                    sidebarBottom.style.display = "block";
                    sidebarTopTel.style.display = "flex";
                    sidebarTop.style.marginBottom = "30px";
                    sidebarTopAddress.style.display = "block";
                    listItems.forEach(item => {
                        item.style.display = "flex";
                        item.style.borderBottom = "1px solid #F1F1F1";
                        item.style.paddingBottom = "14px";
                        const itemAnchor = item.querySelector("a");
                        const itemIconArrow = item.querySelector(".icon-arrow");
                        if (itemAnchor && itemIconArrow) {
                            itemAnchor.style.display = "block";
                            itemIconArrow.style.display = "block";
                        }
                        const sublistGroup = item.querySelector(".navigation-sublist-group");
                        if (sublistGroup) {
                            sublistGroup.style.display = "none";
                        }
                    });
                }
            }
        };        
        
        sidebarBackBtn.addEventListener('click', handleBackButtonClick);
        

        listItems.forEach(function (item) {
            item.addEventListener("click", function (event) {
                // event.stopPropagation();
                handleMenuItemClick(event, item, '.navigation-sublist-group', listItems);
            });
        });

        subListItems.forEach(function (submenuItem) {
            submenuItem.addEventListener("click", function (event) {
                event.stopPropagation();
                handleMenuItemClick(event, submenuItem, '.navigation-sublist__item-content', subListItems);
            });
        });
    }
};

const compareTableAutoHeight = () => {
    const leftThead = document.querySelector('.compare-content__left thead');
    const rightTheads = document.querySelectorAll('.compare-content__right thead');

    if (leftThead) {
        let maxTheadHeight = 0;

        rightTheads.forEach(rightThead => {
            const rightTheadHeight = rightThead.clientHeight;
            maxTheadHeight = Math.max(maxTheadHeight, rightTheadHeight);
        });

        leftThead.style.height = maxTheadHeight + 'px';
    }

    const leftRows = document.querySelectorAll('.compare-content__left tbody tr');
    const swiperSlides = document.querySelectorAll('.swiper-slide');

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

const setWrapperCompareWidth = () => {
    if ( window.innerWidth < 1660 ) {
        const breadcrumbsWrapper = document.querySelector('.breadcrumbs.wrapper');
        const wrapperCompare = document.querySelector('.wrapper-compare');
        const screenWidth = window.innerWidth;

        if (wrapperCompare){
            wrapperCompare.style.width = `${breadcrumbsWrapper.offsetWidth + (screenWidth-breadcrumbsWrapper.offsetWidth) / 2}px`;
        }

    }
}

const appearanceBtnup = () => {
    const btnUp = {
        el: document.querySelector('.btn-up'),
        show() {
            this.el.classList.remove('btn-up_hide');
        },
        hide() {
            this.el.classList.add('btn-up_hide');
        },
        addEventListener() {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                scrollY > 400 ? this.show() : this.hide();
            });

            this.el.onclick = () => {
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