import { MIN_PRICE } from './constant.js';
import { sendData } from './api.js';
import { openModal, closeModal, success, error } from './user-modal.js';
const typeField = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const form = document.querySelector('.ad-form');
const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');
const titleInput = form.querySelector('#title');
const addressInput = form.querySelector('#address');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOMS = 100;
const NO_ROOMS = 0;
const MODAL_SHOW_TIME = 5000;

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

form.addEventListener('focus', () => {
  form.addEventListener('change', changeHandler);

  titleInput.addEventListener('input', inputHandler);
}, true);

form.addEventListener('blur', () => {
  form.removeEventListener('change', changeHandler, true);
  titleInput.removeEventListener('input', inputHandler, true);
});

const showModal = (response) => {
  openModal(response);

  setTimeout(() => {
    closeModal(response);
  }, MODAL_SHOW_TIME);
}

const sendOfferFormSubmit = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    sendData(
      () => {
        form.reset();
        showModal(success);
      },
      () => showModal(error),
      new FormData(e.target),
    );
  });
};

export { form, addressInput, MIN_PRICE, sendOfferFormSubmit };
