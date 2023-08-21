document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider-gallery");
    const sliderCards = document.querySelector(".slider-gallery__list");
    const prevBtn = document.querySelector(".slider-gallery__controls__prev-btn");
    const nextBtn = document.querySelector(".slider-gallery__controls__next-btn");
  
    const cardWidth = document.querySelector(".slider-gallery__list-item").offsetWidth;
    const cardsToShow = 4;
    let currentIndex = 0;
    let isDragging = false;
    let startPosX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
  
    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= sliderCards.children.length - cardsToShow;
    }
  
    function slide(direction) {
        if (direction === "next") {
            currentIndex += 1;
        } else if (direction === "prev") {
            currentIndex -= 1;
        }
  
        if (currentIndex < 0) {
            currentIndex = 0;
        } else if (currentIndex > sliderCards.children.length - cardsToShow) {
            currentIndex = sliderCards.children.length - cardsToShow;
        }
  
        sliderCards.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateButtons();
    }
  
    prevBtn.addEventListener("click", function () {
        slide("prev");
    });
  
    nextBtn.addEventListener("click", function () {
        slide("next");
    });
  
    sliderCards.addEventListener("mousedown", (e) => {
        isDragging = true;
        startPosX = e.clientX;
        prevTranslate = currentTranslate;
  
        sliderCards.style.transition = "none";
    });
  
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const x = e.clientX;
            const deltaX = x - startPosX;
            currentTranslate = prevTranslate + deltaX;
  
            sliderCards.style.transform = `translateX(${currentTranslate}px)`;
        }
    });
  
    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            const movedCards = Math.round(currentTranslate / cardWidth);
  
            currentIndex -= movedCards;
            slide();
            sliderCards.style.transition = "";
        }
    });
  
    document.addEventListener("mouseleave", () => {
        if (isDragging) {
            isDragging = false;
            const movedCards = Math.round(currentTranslate / cardWidth);
  
            currentIndex -= movedCards;
            slide();
            sliderCards.style.transition = "";
        }
    });
  
    updateButtons();
  });
  