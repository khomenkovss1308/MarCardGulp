document.querySelectorAll('.select').forEach(createSelect);

const singleSelect = document.querySelector('.single');

const multipleSelect = document.querySelector('.multiple');
const multipleSelectList = multipleSelect.querySelector('.list-items')
multipleSelect.querySelector('.select-btn').addEventListener('click', function () {
         if (!multipleSelect.classList.contains('select--disabled')) {
                         toggleSelect(multipleSelect.querySelector('.select-btn'), multipleSelectList);
        }
    });

singleSelect.querySelectorAll('.item').forEach((item) => {
    item.addEventListener('click', function () {
        resetSelectedItems(multipleSelect.nextSibling, multipleSelect.querySelector('.select-btn'), [])
    });
});


function updateSelect(selectElement){
    const selectHead = selectElement.previousElementSibling.querySelector('.select-btn');
    const selectList = selectHead.nextElementSibling;
    selectList.innerHTML = '';
    const selectedValues = [];
    const selectItems = selectList.querySelectorAll('.item');

    const selectOptions = selectElement.querySelectorAll('option');

    for (let i = 0; i < selectOptions.length; i++) {
        if (i !== 0){
            const selectHeadItem = createSelectItem(selectElement, selectOptions[i], selectedValues, selectItems, selectHead, selectList);
            selectList.appendChild(selectHeadItem);
        }
    }

    if (selectOptions.length < 2){
        selectElement.previousElementSibling.classList.add('select--disabled');
    } else {
       selectElement.previousElementSibling.classList.remove('select--disabled');
    }

}

singleSelect.querySelector('.select-btn').addEventListener('click', function (e) {
    if (e.target === singleSelect.querySelector('.select-btn')) {
        resetSingleSelect(singleSelect, []);
        let select = document.querySelector('.car_model_id').querySelector('select');
        select.querySelectorAll('option').forEach((opt) => {
            if (opt.value) {
                select.removeChild(opt);
            }

        })
        updateSelect(select.parentElement)
        resetSelectedItems(multipleSelect.nextSibling, multipleSelect.querySelector('.select-btn'), [])
    }
});


// Создание выпадающего списка на основе дефолтного селекта
function createSelect(selectElement) {

    const selectOptions = selectElement.querySelectorAll('option');
    const selectOptionLength = selectOptions.length;
    const iconSrc = selectElement.querySelector('img').src;

    selectElement.style.display = 'none';
    selectElement.classList.add('select-init');
    const selectWrapper = document.createElement('div');
    selectWrapper.className = 'select';
    selectWrapper.classList.add(selectElement.classList.contains('select--checkbox') ? 'multiple' : 'single');
    selectElement.parentNode.insertBefore(selectWrapper, selectElement);

    const selectHead = createSelectHead(selectElement, iconSrc);
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
    window.addEventListener('click', function(e){
      if (!selectHead.contains(e.target) && !selectList.contains(e.target)){
            selectHead.classList.remove('open');
            selectHead.nextElementSibling.style.display = 'none';
      }
    });

    document.querySelector('.main-filter__btn--reset').addEventListener('click', function () {
        resetSelectedItems(selectElement, selectHead, selectedValues);
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
function createSelectHead(selectElement, iconSrc) {
    if (selectElement.classList.contains('select--checkbox')) {
        const selectHead = document.createElement('div');
        selectHead.className = 'select-btn';
        const selectHeadSpan = createSelectHeadSpan(selectElement);
        const selectHeadIcon = createSelectHeadIcon(iconSrc);
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
function createSelectHeadSpan(selectElement) {
    const selectHeadSpan = document.createElement('span');
    selectHeadSpan.className = 'btn-text';
    selectHeadSpan.textContent = selectElement.querySelector('option:disabled').textContent;
    return selectHeadSpan;
}

// Создание иконки в выпадающем списке
function createSelectHeadIcon(iconSrc) {
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
        const value = option.value;

        if (!selectElement.classList.contains('select--checkbox')) {
            selectItems.forEach(item => {
                item.classList.remove('checked');
            });

            selectHeadItem.classList.add('checked');
            selectedValues.length = 0;
            const value = option.value;
            selectedValues.push(value);

            updateSelectHeadText(selectHead, selectElement);
        } else {
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

        updateDefaultSelect(option);

        toggleSelectChecked(selectElement, selectedValues);
    });

    return selectHeadItem;
}

function updateDefaultSelect(option) {
    option.selected = !option.selected;

    const selectElement = option.closest('select');
    const changeEvent = new Event('change', {
        bubbles: true
    });
    selectElement.dispatchEvent(changeEvent);
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
    if (selectHead.classList.contains('open')) {
        selectHead.classList.remove('open');
        selectList.style.display = 'none';


    } else {
        selectHead.classList.add('open');
        selectList.style.display = 'block';
    }

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

// Очистка одиночного селекта
function resetSingleSelect(selectElement, selectedValues) {
    selectElement.classList.remove('select--checked');

    const selectList = selectElement.querySelector('.list-items');

    selectList.querySelectorAll('.item.checked').forEach(item => {
        item.classList.remove('checked');
    });
    selectElement.nextElementSibling.querySelectorAll('option')[0].selected = true;
    const changeEvent = new Event('change', {
        bubbles: true
    });
    selectElement.dispatchEvent(changeEvent);
    selectedValues.length = 0;
    selectElement.querySelector('input').value = '';
}

function resetDefaultSelect(selectElement) {
    defaultSlectElement = selectElement.querySelector('select');
    let options = defaultSlectElement && defaultSlectElement.options;

    if (selectElement.previousElementSibling.classList.contains('single')){
        options[0].selected = true;
    } else {
        for (let i=0; i<options.length; i++) {
        options[i].selected = false;
        }
    }
}

// Очистка всей формы
function resetSelectedItems(selectElement, selectHead, selectedValues) {
    resetDefaultSelect(selectElement, 'resetSelectedItems');
    const selectList = selectElement.previousElementSibling.querySelector('.list-items');
    selectedValues.length = 0;
    const selectItems = Array.from(selectList.querySelectorAll('.item.checked'));

    selectItems.forEach(item => {
        item.classList.remove('checked');
    });

    updateSelectHeadText(selectHead, selectElement);
    selectElement.previousElementSibling.classList.remove('select--checked');

    document.querySelector('.main-filter').querySelectorAll('.input-default').forEach(input => {
        const classToAdd = 'inputActive';
        input.classList.remove(classToAdd);
        input.style.paddingLeft = '17px';
        if (input.nextElementSibling) {
            input.nextElementSibling.remove();
        }
    });

}

// Работа псевдоэлемента в инпутах
function createRemovePseudoElement(input) {
    const existingPseudoElement = input.nextElementSibling;

    if (input.value.length > 0) {
        if (!existingPseudoElement) {
            const pseudoElement = document.createElement('span');
            pseudoElement.className = 'description-plaseholder';
            pseudoElement.innerText = input.placeholder;
            input.parentNode.appendChild(pseudoElement);
        }
    } else {
        if (existingPseudoElement) {
            existingPseudoElement.remove();
        }
    }
}

// Обработка клика на инпут
function handleInput() {
    document.querySelector('.main-filter').querySelectorAll('.input-default').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.toggle('inputActive', input.value.length > 0);
            input.style.paddingLeft = input.value.length > 0 ? '90px' : '17px';
            createRemovePseudoElement(input);
        });
    });
}
handleInput();