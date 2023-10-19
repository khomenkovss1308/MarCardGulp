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

    const selectHead = createselectHead(selectElement, iconSrc);
    selectWrapper.appendChild(selectHead);

    const selectList = createSelectList();
    selectWrapper.appendChild(selectList);

    let selectedValues = [];
    const selectItems = [];

    if (selectOptionLength < 2 || selectWrapper.classList.contains('select--models')) {
        selectWrapper.classList.add('select--disabled');
    } else {
        for (let i = 1; i < selectOptionLength; i++) {
            const selectHeadItem = createSelectItem(selectElement, selectOptions[i], selectedValues, selectItems, selectHead, selectList);
            selectList.appendChild(selectHeadItem);
            selectItems.push(selectHeadItem);
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

    document.querySelector('.single').querySelector('.select-btn').addEventListener('click', function (e) {
        if (e.target === document.querySelector('.single').querySelector('.select-btn')) {
            resetSingleSelect(document.querySelector('.single'), selectHead);
        }
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
function createselectHead(selectElement, iconSrc) {
    if (selectElement.classList.contains('select--checkbox')) {
        const selectHead = document.createElement('div');
        selectHead.className = 'select-btn';
        const selectHeadSpan = createselectHeadSpan(selectElement);
        const selectHeadIcon = createselectHeadIcon(iconSrc);
        selectHead.appendChild(selectHeadSpan);
        selectHead.appendChild(selectHeadIcon);
        return selectHead;
    } else {
        const selectHead = document.createElement('div');
        selectHead.className = 'select-btn';
        const selectHeadInput = document.createElement('input');
        selectHeadInput.className = 'select-btn__input';
        selectHead.appendChild(selectHeadInput);
        selectHeadInput.placeholder = selectElement.querySelector('option:disabled').textContent;
        selectHeadInput.type = 'text';

        return selectHead;
    }

}

// Создание текстового элемента в выпадающем списке
function createselectHeadSpan(selectElement) {
    const selectHeadSpan = document.createElement('span');
    selectHeadSpan.className = 'btn-text';
    selectHeadSpan.textContent = selectElement.querySelector('option:disabled').textContent;
    return selectHeadSpan;
}

// Создание иконки в выпадающем списке
function createselectHeadIcon(iconSrc) {
    const selectHeadIcon = document.createElement('img');
    selectHeadIcon.className = 'arrow-dwn';
    selectHeadIcon.src = iconSrc;
    return selectHeadIcon;
}

// Создание контейнера для элементов в выпадающем списке
function createSelectList() {
    const selectList = document.createElement('div');
    selectList.className = 'list-items';
    return selectList;
}

// Создание элемента в выпадающем списке на основе option
function createSelectItem(selectElement, option, selectedValues, selectItems, selectHead, selectList) {
    const selectHeadItem = document.createElement('div');
    selectHeadItem.className = 'item';

    if (selectElement.classList.contains('select--checkbox')) {
        const checkbox = createCheckbox();
        selectHeadItem.appendChild(checkbox);
    }

    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = option.textContent;
    selectHeadItem.appendChild(span);
    selectHeadItem.setAttribute('data-value', option.value);

    selectHeadItem.addEventListener('click', function (event) {

        if (!selectElement.classList.contains('select--checkbox')) {
            selectItems.forEach(item => {
                item.classList.remove('checked');
            });

            selectHeadItem.classList.add('checked');
            selectedValues.length = 0;
            const value = option.value;
            selectedValues.push(value);

            toggleSelect(selectHead, selectList);
            updateSelectHeadText(selectHead, selectElement);
        } else {
            const value = option.value;

            if (!selectHeadItem.classList.contains('checked')) {
                selectHeadItem.classList.add('checked');
                selectedValues.push(value);
            } else {
                selectHeadItem.classList.remove('checked');
                const index = selectedValues.indexOf(value);
                if (index !== -1) {
                    selectedValues.splice(index, 1);
                }
            }
        }

        toggleSelectChecked(selectElement, selectedValues);
    });

    return selectHeadItem;
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
            selectHead.querySelector('input').value = checkedItem.textContent;
        } else {
            selectHead.querySelector('input').placeholder = selectElement.querySelector('option:disabled').textContent;
        }
    }
}


function resetSingleSelect(selectElement) {
    selectElement.classList.remove('select--checked');

    const selectList = selectElement.querySelector('.list-items');
    const selectItems = Array.from(selectList.querySelectorAll('.item.checked'));

    selectItems.forEach(item => {
        item.classList.remove('checked');
    });

    selectElement.querySelector('input').value = '';
}


function resetSelectedItems(selectElement, selectHead) {
    const selectList = selectElement.previousElementSibling.querySelector('.list-items');

    const selectItems = Array.from(selectList.querySelectorAll('.item.checked'));

    selectItems.forEach(item => {
        item.classList.remove('checked');
    });

    updateSelectHeadText(selectHead, selectElement);

    selectElement.previousElementSibling.classList.remove('select--checked');


    document.querySelector('.main-filter').querySelectorAll('input').forEach(input => {
        const classToAdd = 'inputActive';
        input.classList.remove(classToAdd);
    });
}


let currentOpenSelect = null;

document.querySelectorAll('.select').forEach(createSelect);



const handleInput = () => {
    document.querySelector('.main-filter').querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const inputValue = input.value;
            const classToAdd = 'inputActive';

            if (inputValue.length > 0) {
                input.classList.add(classToAdd);
            } else {
                input.classList.remove(classToAdd);
            }
        });
    });
}

handleInput();