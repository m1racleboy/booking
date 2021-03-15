import { sendOfferFormSubmit } from './form.js';
import { getPins } from './map.js';
import { getData } from './api.js';

getData((offers) => {
  getPins(offers);
});

sendOfferFormSubmit();
