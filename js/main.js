import { form } from './form.js';
import { getPins } from './map.js';
import { getData, sendData } from './api.js';
import { showModal, resetPage } from './util.js';
import { COUNT_OF_PINS } from './constant.js';
import { success, error } from './user-modal.js';

const resetButton = form.querySelector('.ad-form__reset');

getData((offers) => {
  getPins(offers.slice(0, COUNT_OF_PINS));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  sendData(
    () => {
      showModal(success);
    },
    () => showModal(error),
    new FormData(e.target),
  );
});

resetButton.addEventListener('click', (e) => {
  e.preventDefault();
  resetPage();
});
