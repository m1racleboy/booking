import { DEFAULT_AVATAR_PREVIEW, FILE_TYPES, MODAL_SHOW_TIME, RoomsCount, START_POINTS } from '../const.js';
import { addressInput, avatarPreview, form, housingImagePreview, mapFilters } from '../form.js';
import { refreshMap } from '../map.js';
import { closeModal, openModal } from '../user-modal.js';
import { success } from '../user-modal.js';

export const getCapacity = (guests, rooms) => {
  let capacity;

  switch (rooms) {
    case RoomsCount.ONE_ROOM_VALUE: capacity = `${rooms} комната - `;
      break;
    case RoomsCount.TWO_ROOMS_VALUE:
    case RoomsCount.THREE_ROOMS_VALUE:
    case RoomsCount.FOUR_ROOMS_VALUE: capacity = `${rooms} комнаты - `;
      break;
    case RoomsCount.HUNDRED_ROOMS_VALUE: capacity = `${rooms} комнат не для гостей.`;
      break;
    default: capacity = `${rooms} комнат - `;
  }

  if (typeof guests === 'number') {
    return capacity += `для ${guests} гост${guests === RoomsCount.ONE_ROOM_VALUE ? 'я' : 'ей'}.`;
  }
  return capacity;
};

export const getSimpleStructure = (data) => data.map((elem) => {
  const { author, offer, location, extended } = elem;
  typeof offer['features'] === 'undefined' ? offer['features'] = [] : offer;
  elem = Object.assign({}, author, offer, location, extended);
  return elem;
});

export const resetPage = () => {
  form.reset();
  mapFilters.reset();
  addressInput.value = START_POINTS;
  avatarPreview.src = DEFAULT_AVATAR_PREVIEW;
  housingImagePreview.textContent = '';
  refreshMap();
};

export const isPicture = (pictureName) => {
  pictureName.toLowerCase();
  return FILE_TYPES.some((filesType) => pictureName.endsWith(filesType));
};

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
};
