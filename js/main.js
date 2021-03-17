import { addressInput, form, mapFilters } from './form.js';
import { getPins, refreshMap } from './map.js';
import { getData, sendData } from './api.js';
import { showModal } from './util.js';
import { COUNT_OF_PINS, MIN_POSITIVE_NUMBER, START_POINTS } from './constant.js';
import { success, error } from './user-modal.js';

getData((offers) => {
  getPins(offers.slice(MIN_POSITIVE_NUMBER, COUNT_OF_PINS));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  sendData(
    () => {
      form.reset();
      mapFilters.reset();
      addressInput.value = START_POINTS;
      refreshMap();
      showModal(success);
    },
    () => showModal(error),
    new FormData(e.target),
  );
});
