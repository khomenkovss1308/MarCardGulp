// Создание выпадающего списка на основе селекта
function createSelect(selectElement) {
    const selectOptions = selectElement.querySelectorAll('option');
    const selectOptionLength = selectOptions.length;
    const iconSrc = selectElement.querySelector('img').src;

    selectElement.style.display = 'none';
    const selectWrapper = document.createElement('div');
    selectWrapper.className = 'select';
    selectWrapper.classList.add(selectElement.classList.contains('select--checkbox') ? 'multiple' : 'single');
    selectElement.parentNode.insertBefore(selectWrapper, selectElement);

    const newSelect = createNewSelect(selectElement, iconSrc);
    selectWrapper.appendChild(newSelect);

    const selectHead = newSelect;
    const selectList = createSelectList();
    selectWrapper.appendChild(selectList);

    let selectedValues = [];
    const selectItems = [];

    if (selectOptionLength < 2 || selectWrapper.classList.contains('select--models')) {
        selectWrapper.classList.add('select--disabled');
    } else {
        for (let i = 1; i < selectOptionLength; i++) {
            const newSelectItem = createSelectItem(selectElement, selectOptions[i], selectedValues, selectItems, selectHead);
            selectList.appendChild(newSelectItem);
            selectItems.push(newSelectItem);
        }
    }


    selectList.style.display = 'none';

    if (!selectWrapper.classList.contains('select--disabled')) {
        selectHead.addEventListener('click', function () {
            toggleSelect(selectHead, selectList);
        });
    }

    document.querySelector('.main-filter__btn--reset').addEventListener('click', function () {
        resetSelectedItems(selectElement, selectHead);
    });
}

// Переключение класса .select--checked
function toggleSelectChecked(selectElement, selectedValues) {
    const parentElement = selectElement.parentElement;
    const selectElements = parentElement.querySelectorAll('.select');
    const currentIndex = Array.from(selectElements).indexOf(selectElement);
    const siblingSelect = selectElements[currentIndex - 1];

    if (siblingSelect) {
        if (selectedValues.length > 0) {
            siblingSelect.classList.add('select--checked');
        } else {
            siblingSelect.classList.remove('select--checked');
        }
    }
}


// Создание элемента "выбрать" в выпадающем списке
function createNewSelect(selectElement, iconSrc) {
    const newSelect = document.createElement('div');
    newSelect.className = 'select-btn';
    const newSelectSpan = createNewSelectSpan(selectElement);
    const newSelectIcon = createNewSelectIcon(iconSrc);
    newSelect.appendChild(newSelectSpan);
    newSelect.appendChild(newSelectIcon);
    return newSelect;
}

// Создание текстового элемента в выпадающем списке
function createNewSelectSpan(selectElement) {
    const newSelectSpan = document.createElement('span');
    newSelectSpan.className = 'btn-text';
    newSelectSpan.textContent = selectElement.querySelector('option:disabled').textContent;
    return newSelectSpan;
}

// Создание иконки в выпадающем списке
function createNewSelectIcon(iconSrc) {
    const newSelectIcon = document.createElement('img');
    newSelectIcon.className = 'arrow-dwn';
    newSelectIcon.src = iconSrc;
    return newSelectIcon;
}

// Создание контейнера для элементов в выпадающем списке
function createSelectList() {
    const selectList = document.createElement('div');
    selectList.className = 'list-items';
    return selectList;
}

// Создание элемента в выпадающем списке на основе option
function createSelectItem(selectElement, option, selectedValues, selectItems, selectHead) {
    const newSelectItem = document.createElement('div');
    newSelectItem.className = 'item';

    if (selectElement.classList.contains('select--checkbox')) {
        const checkbox = createCheckbox();
        newSelectItem.appendChild(checkbox);
    }

    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = option.textContent;
    newSelectItem.appendChild(span);
    newSelectItem.setAttribute('data-value', option.value);

    newSelectItem.addEventListener('click', function (event) {

        if (!selectElement.classList.contains('select--checkbox')) {

            if (newSelectItem.classList.contains('checked')) {
                newSelectItem.classList.remove('checked');
                selectedValues.length = 0;
            } else {
                selectItems.forEach(item => {
                    item.classList.remove('checked');
                });

                newSelectItem.classList.add('checked');
                selectedValues.length = 0;

                const value = option.value;
                selectedValues.push(value);
            }

            updateSelectHeadText(selectHead, selectElement);
        } else {
            const value = option.value;

            if (!newSelectItem.classList.contains('checked')) {
                newSelectItem.classList.add('checked');
                selectedValues.push(value);
            } else {
                newSelectItem.classList.remove('checked');
                const index = selectedValues.indexOf(value);
                if (index !== -1) {
                    selectedValues.splice(index, 1);
                }
            }
        }

        toggleSelectChecked(selectElement, selectedValues);
    });

    return newSelectItem;
}

// Создание элемента "чекбокс" в выпадающем списке
function createCheckbox() {
    const checkbox = document.createElement('span');
    const checkboxI = document.createElement('i');
    checkbox.className = 'checkbox';
    checkboxI.className = 'fa-solid fa-check check-icon';
    checkbox.appendChild(checkboxI);
    return checkbox;
}

// Переключение открытия/закрытия выпадающего списка
function toggleSelect(selectHead, selectList) {
    if (currentOpenSelect && currentOpenSelect !== selectHead) {
        currentOpenSelect.classList.remove('open');
        currentOpenSelect.nextElementSibling.style.display = 'none';
    }

    if (!selectHead.classList.contains('open')) {
        selectHead.classList.add('open');
        selectList.style.display = 'block';
    } else {
        selectHead.classList.remove('open');
        selectList.style.display = 'none';
    }

    currentOpenSelect = selectHead;
}

// Обновление текста в заголовке выпадающего списка
function updateSelectHeadText(selectHead, selectElement) {
    if (!selectElement.classList.contains('select--checkbox')) {
        const checkedItem = selectHead.nextElementSibling.querySelector('.item.checked');
        if (checkedItem) {
            selectHead.querySelector('.btn-text').textContent = checkedItem.textContent;
        } else {
            selectHead.querySelector('.btn-text').textContent = selectElement.querySelector('option:disabled').textContent;
        }
    }
}


function resetSelectedItems(selectElement, selectHead) {

    const selectList = selectElement.previousElementSibling.querySelector('.list-items');

    const selectItems = Array.from(selectList.querySelectorAll('.item.checked'));

    if (selectItems.length > 0) {
        selectItems.forEach(item => {
            item.classList.remove('checked');
        });

        updateSelectHeadText(selectHead, selectElement);

        selectElement.previousElementSibling.classList.remove('select--checked');
    }
}


let currentOpenSelect = null;

document.querySelectorAll('.select').forEach(createSelect);