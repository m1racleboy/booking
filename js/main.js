import { sendOfferFormSubmit } from './form.js';
import { getPins } from './map.js';
import { getData } from './api.js';
import { COUNT_OF_PINS, MIN_POSITIVE_NUMBER } from './constant.js';

getData((offers) => {
  getPins(offers.slice(MIN_POSITIVE_NUMBER, COUNT_OF_PINS));
});

sendOfferFormSubmit();
