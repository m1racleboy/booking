import { MIN_PRICE } from './mock.js';

const typeField = document.querySelector('#type');
const priceInput = document.querySelector('#price');

typeField.addEventListener('change', (e) => {
  const price = MIN_PRICE[e.target.value];
  priceInput.min = price;
  priceInput.value = price;
  priceInput.placeholder = price;
});

const checkin = document.querySelector('#timein');
const checkout = document.querySelector('#timeout');

checkin.addEventListener('change', (e) => {
  checkout.value = e.target.value;
});

checkout.addEventListener('change', (e) => {
  checkin.value = e.target.value;
});
