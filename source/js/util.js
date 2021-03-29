import { FILE_TYPES, MODAL_SHOW_TIME, START_POINTS, DEFAULT_AVATAR_PREVIEW } from './constant.js';
import { openModal, closeModal, success } from './user-modal.js';
import { refreshMap } from './map.js';
import { addressInput, form, mapFilters, avatarPreview, housingImagePreview } from './form.js';

export const resetPage = () => {
  form.reset();
  mapFilters.reset();
  addressInput.value = START_POINTS;
  avatarPreview.src = DEFAULT_AVATAR_PREVIEW;
  housingImagePreview.textContent = '';
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

export const isPicture = (pictureName) => {
  pictureName.toLowerCase();
  return FILE_TYPES.some((filesType) => pictureName.endsWith(filesType));
}
