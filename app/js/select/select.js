// Создание выпадающего списка на основе селекта
function createSelect(selectElement) {
    const selectOptions = selectElement.querySelectorAll('option');
    const selectOptionLength = selectOptions.length;
    const iconSrc = 'images/icons/default/arrowSelectBlue.svg';

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

    for (let i = 1; i < selectOptionLength; i++) {
        const newSelectItem = createSelectItem(selectElement, selectOptions[i], selectedValues, selectItems, selectHead, selectElement, selectOptions);
        selectList.appendChild(newSelectItem);
        selectItems.push(newSelectItem); // Добавляем элемент в массив selectItems
    }

    selectList.style.display = 'none';

    selectHead.addEventListener('click', function () {
        toggleSelect(selectHead, selectList);
    });
}

// Переключение класса .select--checked
function toggleSelectChecked(selectElement, selectedValues) {
    const parentElement = selectElement.parentElement; // Получаем родительский элемент

    // Находим все элементы с классом .select внутри родителя
    const selectElements = parentElement.querySelectorAll('.select');

    // Находим индекс текущего элемента
    const currentIndex = Array.from(selectElements).indexOf(selectElement);

    // Выбираем элемент, который находится выше текущего
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
function createSelectItem(selectElement, option, selectedValues, selectItems, selectHead, selectElement, selectOptions) {
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
        const value = option.value;

        if (!newSelectItem.classList.contains('checked')) {
            newSelectItem.classList.add('checked');
            selectedValues.push(value); // Добавляем значение в массив
        } else {
            newSelectItem.classList.remove('checked');
            const index = selectedValues.indexOf(value);
            if (index !== -1) {
                selectedValues.splice(index, 1); // Удаляем значение из массива
            }
        }

        if (!selectElement.classList.contains('select--checkbox')) {
            selectItems.forEach(item => {
                if (item !== newSelectItem) {
                    item.classList.remove('checked');
                }
            });
            updateSelectHeadText(selectHead, selectedValues, selectElement, selectOptions);
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
function updateSelectHeadText(selectHead, selectedValues, selectElement, selectOptions) {
    if (!selectElement.classList.contains('select--checkbox')) {
        const checkedItem = selectHead.nextElementSibling.querySelector('.item.checked');
        if (checkedItem) {
            selectHead.querySelector('.btn-text').textContent = checkedItem.textContent;
        } else {
            selectHead.querySelector('.btn-text').textContent = selectElement.querySelector('option:disabled').textContent;
        }
    } else {
        if (selectedValues.length > 0) {
            const selectedTexts = selectedValues.map(value => {
                const option = Array.from(selectOptions).find(opt => opt.value === value);
                return option ? option.textContent : value;
            });
            selectHead.querySelector('.btn-text').textContent = selectedTexts.join(', ');
        } else {
            selectHead.querySelector('.btn-text').textContent = selectElement.querySelector('option:disabled').textContent;
        }
    }
}


let currentOpenSelect = null;

document.querySelectorAll('.select').forEach(createSelect);