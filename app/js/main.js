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

    if (dropdown.classList.contains("active")) {
        dropdown.classList.remove("active");
        header.classList.remove("dropdown-active");
    } else {
        let activeDropdown = document.querySelector(".dropdown-content.active");
        if (activeDropdown) {
            activeDropdown.classList.remove("active");
        }
        dropdown.classList.add("active");
        header.classList.add("dropdown-active");
    }
};

const closeDropdown = (dropdownId) => {
    let dropdown = document.getElementById("dropdown-" + dropdownId);
    let header = document.querySelector(".header");

    dropdown.classList.remove("active");
    header.classList.remove("dropdown-active");
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



document.addEventListener('DOMContentLoaded', () => {
    //call function videoPlayer
    videPlayer(".video__container", ".video");

    //call fuction handleToggleText
    handleToggleText('.seo-block__content', '.seo-block__subtitle', '#btn-read-more-seo', '#btn-collapse-seo', '208px');
    handleToggleText('.services-rent__benefit-container', '.services-rent__benefit', '#btn-read-more-rent', '#btn-collapse-rent', '138px');

    handleToggleText('.service__maintenance-collapse__container', '.service__maintenance-collapse__content', '#btn-read-more-service', '#btn-collapse-service', '290px');
    handleToggleText('.service__benefit-container', '.service__list-benefit', '#btn-read-more-service', '#btn-collapse-service', '138px');
    handleToggleText('.service__benefit-container-2', '.service__list-benefit-2', '#btn-read-more-service-2', '#btn-collapse-service-2', '138px');

    sidebarFunctioning();
    if (window.innerWidth <= 1080){
        toggleSubMenu();
    }
});