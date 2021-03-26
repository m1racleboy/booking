import { MODAL_SHOW_TIME, START_POINTS } from './constant.js';
import { openModal, closeModal, success } from './user-modal.js';
import { refreshMap } from './map.js';
import { addressInput, form, mapFilters } from './form.js';

export const resetPage = () => {
  form.reset();
  mapFilters.reset();
  addressInput.value = START_POINTS;
  refreshMap();
}

export const showModal = (response) => {
  if (response === success) {
    openModal(response);
    resetPage();
    refreshMap();
  }
  else {
    openModal(response);
  }

  setTimeout(() => {
    closeModal(response);
  }, MODAL_SHOW_TIME);
}
