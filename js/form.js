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

const checkinFieldHandler = (e) => {
  checkout.value = e.target.value;
}

const checkoutFieldHandler = (e) => {
  checkin.value = e.target.value;
}

form.addEventListener('change', (e) => {
  if (e.target === typeField) {
    typeFieldHandler(e);
  }

  if (e.target === checkin) {
    checkinFieldHandler(e);
  }

  if (e.target === checkout) {
    checkoutFieldHandler(e);
  }
});
