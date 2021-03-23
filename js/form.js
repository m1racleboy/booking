import { MAX_ROOMS, MAX_TITLE_LENGTH, MIN_PRICE, MIN_TITLE_LENGTH, NO_ROOMS } from './constant.js';
import { success, error, closeModal } from './user-modal.js';
import { showModal, resetPage } from './util.js';
import { sendData } from './api.js';
const typeField = document.querySelector('#type');
const priceInput = document.querySelector('#price');
export const form = document.querySelector('.ad-form');
export const mapFilters = document.querySelector('.map__filters');
export const childeNodes = [...mapFilters.children, ...form.children];
export const addressInput = form.querySelector('#address');
const resetButton = form.querySelector('.ad-form__reset');
const closeErrorButton = error.querySelector('.error__button');
const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');
const titleInput = form.querySelector('#title');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

export const changeFormsStates = (node, condition) => {
  node.forEach(element => {
    element.disabled = condition;
  });

  if (condition) {
    form.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  }
  else {
    form.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  }
}

const typeFieldHandler = (targetValue) => {
  const price = MIN_PRICE[targetValue];
  priceInput.min = price;
  priceInput.placeholder = price;
};

const timeFieldHandler = (targetValue) => {
  checkout.value = targetValue;
  checkin.value = targetValue;
}

const optionsHandler = (options) => {
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

const capacityHandler = optionsHandler([...capacity]);
capacityHandler(rooms.value);

const capacitySelectOptionsHandler = (targetValue) => {
  capacity.value = +targetValue === MAX_ROOMS ? NO_ROOMS : targetValue;
  capacityHandler(targetValue);
}

const changeHandler = (e) => {
  const targetInput = e.target;
  const targetValue = targetInput.value;

  switch (targetInput) {
    case typeField:
      typeFieldHandler(targetValue);
      break;
    case checkin:
      timeFieldHandler(targetValue);
      break;
    case checkout:
      timeFieldHandler(targetValue);
      break;
    case rooms:
      capacitySelectOptionsHandler(targetValue);
      break;
    default: break;
  }
}

const inputHandler = () => {
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

const closeModalHandler = () => {
  closeModal(error);
}

form.addEventListener('focus', () => {
  form.addEventListener('change', changeHandler);
  titleInput.addEventListener('input', inputHandler);
  form.addEventListener('submit', sendOfferFormSubmit);
  resetButton.addEventListener('click', resetHandler);
  closeErrorButton.addEventListener('click', closeModalHandler);
}, true);

form.addEventListener('blur', () => {
  form.removeEventListener('change', changeHandler, true);
  titleInput.removeEventListener('input', inputHandler, true);
  form.removeEventListener('submit', sendOfferFormSubmit, true);
  resetButton.removeEventListener('click', resetHandler, true);
  closeErrorButton.removeEventListener('click', closeModalHandler, true);
});
