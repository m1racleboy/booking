import { MIN_PRICE } from './mock.js';

const typeField = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const form = document.querySelector('.ad-form');
const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');

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
});

export { form };
