const TYPE = document.querySelector('#type');
const PRICE_INPUT = document.querySelector('#price');

const MIN_PRICE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};

TYPE.addEventListener('change', function () {
  let price = MIN_PRICE[this.value];
  PRICE_INPUT.setAttribute('min', price);
  PRICE_INPUT.value = price;
  PRICE_INPUT.placeholder = price;
});

const TIMEIN = document.querySelector('#timein');
const TIMEOUT = document.querySelector('#timeout');

TIMEIN.addEventListener('change', function () {
  let selectValue = this.value;
  TIMEOUT.value = selectValue;
});

TIMEOUT.addEventListener('change', function () {
  let selectValue = this.value;
  TIMEIN.value = selectValue;
});
