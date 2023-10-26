const changeContent = (section) => {
    const tabButtons = section.querySelectorAll('.tabs__item');
    const contentBlocks = section.querySelectorAll('.appearance__container');

    const toggleText = (target, btnReadMore, btnCollapse, maxHeight) => {
        const targetHeight = target.scrollHeight;
        if (targetHeight <= maxHeight) {
            btnReadMore.style.display = 'none';
            btnCollapse.style.display = 'none';
        } else {
            btnReadMore.style.display = 'flex';
            btnCollapse.style.display = 'none';
        }
    };

    const changeTab = (selectedButton, selectedContentBlock) => {
        tabButtons.forEach(button => button.classList.remove('active'));
        selectedButton.classList.add('active');

        contentBlocks.forEach(block => {
            block.classList.remove('selected');
        });

        selectedContentBlock.classList.add('selected');
        const target = selectedContentBlock.querySelector('.toggle-content');
        const btnReadMore = selectedContentBlock.querySelector('.btn-read-more');
        const btnCollapse = selectedContentBlock.querySelector('.btn-collapse');
        const maxHeight = parseInt(target.getAttribute('data-max-height'));
        
        toggleText(target, btnReadMore, btnCollapse, maxHeight);
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            changeTab(button, contentBlocks[index]);
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