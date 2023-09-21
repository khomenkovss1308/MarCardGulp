const changeContent = (section) => {
    const tabButtons = section.querySelectorAll('.tabs__item');
    
    const changeTab = (selectedButton) => {
        tabButtons.forEach(button => button.classList.remove('active'));
        selectedButton.classList.add('active');
        
        const contentBlocks = section.querySelectorAll('.appearance__container');
        contentBlocks.forEach(block => block.classList.remove('selected'));
        
        const selectedIndex = Array.from(tabButtons).indexOf(selectedButton);
        
        const selectedContent = contentBlocks[selectedIndex];
        selectedContent.classList.add('selected');
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
