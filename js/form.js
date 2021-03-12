import { MIN_PRICE } from './mock.js';

const typeField = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const form = document.querySelector('.ad-form');
const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');
const titleInput = form.querySelector('#title');
const addressInput = form.querySelector('#address');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const roomsCount = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');

const typeFieldHandler = (targetValue) => {
  const price = MIN_PRICE[targetValue];
  priceInput.min = price;
  priceInput.placeholder = price;
};

const timeFieldHandler = (targetValue) => {
  checkout.value = targetValue;
  checkin.value = targetValue;
}

const capacityFieldHandler = (targetValue) => {
  const MAX_ROOMS = 100;
  const NO_ROOMS = 0;
  const rooms = [...roomsCount.children].map(element => +element.value);
  const capacity = [...capacitySelect];
  const capacityValues = capacity.map(element => +element.value);
  if (targetValue === MAX_ROOMS) {
    capacitySelect.value = NO_ROOMS;
  }
  else {
    capacitySelect.value = targetValue;
  }
  capacityValues.forEach((element, i) => {
    if (element === rooms[i] && element <= targetValue && targetValue !== MAX_ROOMS) {
      capacity[i].disabled = false;
    }
    else if (targetValue === MAX_ROOMS && element === NO_ROOMS) {
      capacity[capacity.length - 1].disabled = false;
    }
    else {
      capacity[i].disabled = true;
    }
  });
}

const changeHandler = (e) => {
  const targetInput = e.target;
  const targetValue = targetInput.value;

  switch (targetInput) {
    case typeField: typeFieldHandler(targetValue);
      break;
    case checkin:
    case checkout: timeFieldHandler(targetValue);
      break;
    case roomsCount: capacityFieldHandler(+targetValue);
      break;
    default: 'something';
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
  form.addEventListener('change', (e) => {
    changeHandler(e);
  });

  titleInput.addEventListener('input', () => {
    inputHandler();
  });
}, true);

form.addEventListener('blur', (e) => {
  form.removeEventListener('change', changeHandler(e), true);
  form.removeEventListener('input', inputHandler(), true);
});



export { form, addressInput };
