import { MAX_ROOMS, MAX_TITLE_LENGTH, MIN_PRICE, MIN_TITLE_LENGTH, NO_ROOMS } from './constant.js';
import { success, error } from './user-modal.js';
import { showModal, resetPage, isPicture } from './util.js';
import { sendData } from './api.js';
const typeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');
export const form = document.querySelector('.ad-form');
export const mapFilters = document.querySelector('.map__filters');
export const childeForm = [...form.children];
export const childeFilter = [...mapFilters.children];
export const addressInput = form.querySelector('#address');
const resetButton = form.querySelector('.ad-form__reset');
const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');
const titleInput = form.querySelector('#title');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

const avatarInput = document.querySelector('#avatar');
export const avatarPreview = form.querySelector('.ad-form-header__preview img');
const housingImageInput = form.querySelector('#images');
export const housingImagePreview = form.querySelector('.ad-form__photo');

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name;
  if (isPicture(fileName)) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    })
    reader.readAsDataURL(file);
  }
});

housingImageInput.addEventListener('change', () => {
  const file = housingImageInput.files[0];
  const fileName = file.name;
  if (isPicture(fileName)) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const image = reader.result;
      housingImagePreview.insertAdjacentHTML('beforeend',
        `<img src="${image}" alt="Фотография жилья" width="100%" height="100%">`);
    });
    reader.readAsDataURL(file);
  }
});

export const changeFormState = (node, condition) => {
  node.forEach(element => {
    element.disabled = condition;
  });

  if (condition) {
    form.classList.add('ad-form--disabled');
  }
  else {
    form.classList.remove('ad-form--disabled');
  }
}

export const changeFilterState = (node, condition) => {
  node.forEach(element => {
    element.disabled = condition;
  });

  if (condition) {
    mapFilters.classList.add('map__filters--disabled');
  }
  else {
    mapFilters.classList.remove('map__filters--disabled');
  }
}

const changeTypeHandler = (targetValue) => {
  const price = MIN_PRICE[targetValue];
  priceInput.min = price;
  priceInput.placeholder = price;
};

const changeTimeHandler = (targetValue) => {
  checkout.value = targetValue;
  checkin.value = targetValue;
}

const getOptionsHandler = (options) => {
  let memoOptions = [];

  return (targetValue) => {
    memoOptions.forEach(item => {
      item.disabled = false;
    });

    const index = options.findIndex(elem => elem.value === targetValue);
    const arrayToDisabled = index !== -1 ? options.slice(index + 1) : options.slice(0, options.length - 1);
    arrayToDisabled.forEach(item => {
      item.disabled = true;
    });

    memoOptions = [...arrayToDisabled];
  }
}

const getCapacityHandler = getOptionsHandler([...capacity]);
getCapacityHandler(rooms.value);

const selectCapacityHandler = (targetValue) => {
  capacity.value = +targetValue === MAX_ROOMS ? NO_ROOMS : targetValue;
  getCapacityHandler(targetValue);
}

const changeHandler = (e) => {
  const targetInput = e.target;
  const targetValue = targetInput.value;

  switch (targetInput) {
    case typeInput:
      changeTypeHandler(targetValue);
      break;
    case checkin:
      changeTimeHandler(targetValue);
      break;
    case checkout:
      changeTimeHandler(targetValue);
      break;
    case rooms:
      selectCapacityHandler(targetValue);
      break;
    default: break;
  }
}

const checkTitleInputHandler = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
}

const resetHandler = (e) => {
  e.preventDefault();
  resetPage();
}

const sendOfferFormSubmit = (e) => {
  e.preventDefault();
  sendData(
    () => showModal(success),
    () => showModal(error),
    new FormData(e.target),
  );
}

form.addEventListener('focus', () => {
  form.addEventListener('change', changeHandler);
  form.addEventListener('submit', sendOfferFormSubmit);
  titleInput.addEventListener('input', checkTitleInputHandler);
  resetButton.addEventListener('click', resetHandler);
}, true);

form.addEventListener('blur', () => {
  form.removeEventListener('change', changeHandler, true);
  form.removeEventListener('submit', sendOfferFormSubmit, true);
  titleInput.removeEventListener('input', checkTitleInputHandler, true);
  resetButton.removeEventListener('click', resetHandler, true);
});
