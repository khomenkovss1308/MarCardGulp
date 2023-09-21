const changeContent = (section) => {
    const tabButtons = section.querySelectorAll('.tabs__item');
    const contentBlocks = section.querySelectorAll('.appearance__container');

    const changeTab = (selectedButton) => {
        tabButtons.forEach(button => button.classList.remove('active'));
        selectedButton.classList.add('active');

        const selectedIndex = Array.from(tabButtons).indexOf(selectedButton);
        contentBlocks.forEach((block, index) => {
            if (index === selectedIndex) {
                block.classList.add('selected');
            } else {
                block.classList.remove('selected');
            }
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            changeTab(button);
        });
    });

    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
}

const sections = document.querySelectorAll('.appearance');
sections.forEach(section => {
    changeContent(section);
});
