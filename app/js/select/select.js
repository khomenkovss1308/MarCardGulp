const selectButtons = document.querySelectorAll(".select .select-btn");
const itemsLists = document.querySelectorAll(".select .list-items");

let openedMultiselect = null;

selectButtons.forEach((selectBtn, index) => {
    const items = itemsLists[index].querySelectorAll(".item");

    selectBtn.addEventListener("click", () => {
        if (openedMultiselect && openedMultiselect !== selectBtn) {
            openedMultiselect.classList.remove("open");
        }
        selectBtn.classList.toggle("open");
        openedMultiselect = selectBtn;
    });

    items.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("checked");
            updateButtonText(selectBtn, items);
        });
    });
});
