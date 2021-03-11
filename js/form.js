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

const typeFieldHandler = (e) => {
  const price = MIN_PRICE[e.target.value];
  priceInput.min = price;
  priceInput.value = price;
  priceInput.placeholder = price;
};

const timeFieldHandler = (e) => {
  checkout.value = e.target.value;
  checkin.value = e.target.value;
}

form.addEventListener('change', (e) => {
  if (e.target === typeField) {
    typeFieldHandler(e);
  }

  if (e.target === checkin || e.target === checkout) {
    timeFieldHandler(e);
  }

  if (e.target === roomsCount) {
    const options = [...capacitySelect.options];

    const capacity = {
      '1': [options[0]],
      '2': [options[0], options[1]],
      '3': [options[0], options[1], options[2]],
      '100': [options[3]],
    };

    const rooms = e.target.value;
    const capacityOptions = capacity[rooms];

    capacitySelect.value = e.target.value;
    options.forEach(element => {
      element.disabled = true;
    });

    capacityOptions.forEach(element => {
      element.disabled = false;
    });
  }
});

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

export { form, addressInput };
