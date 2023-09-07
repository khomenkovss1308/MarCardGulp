document.addEventListener('DOMContentLoaded', () => {
    const lists = document.querySelectorAll('.mileage-cars-card__list');

    lists.forEach((list) => {
        const items = list.querySelectorAll('.mileage-cars-card__list__item');
        const hiddenItems = list.querySelectorAll('.mileage-cars-card__list__item.hidden');
        const toggleButton = list.querySelector('.toggle-btn');

        let isExpanded = false;

        toggleButton.addEventListener('click', () => {
            hiddenItems.forEach((item) => {
                if (isExpanded) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'list-item';
                }
            });

            if (isExpanded) {
                toggleButton.innerHTML = `
                    <img src="images/icons/default/plus.svg" alt="">
                    <span>Еще <span class="blue">+${hiddenItems.length}</span></span>
                `;
            } else {
                toggleButton.innerHTML = `<span class="blue">Свернуть<span>`;
            }

            isExpanded = !isExpanded;
        });
    });
});
