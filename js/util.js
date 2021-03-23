import { MIN_ELEMENT, MODAL_SHOW_TIME, START_POINTS } from './constant.js';
import { openModal, closeModal, success } from './user-modal.js';
import { refreshMap } from './map.js';
import { addressInput, form, mapFilters } from './form.js';

export const getRandomNumber = (min, max) => {
  min = +min;
  max = +max;

  if ((max >= min) && (min >= 0) && (max > 0)) {
    return Math.random() * (max - min) + min;
  }
  else {
    return 0;
  }
};

export const getRoundNumber = (min, max) => {
  return Math.round(getRandomNumber(min, max));
}

export const getPoint = (x, y, numberOfSings = 0) => {
  let result = getRandomNumber(x, y);
  numberOfSings = +numberOfSings;
  result = numberOfSings >= 0 ? +result.toFixed(numberOfSings) : 0;
  return result;
};

export const getRandomArrayElement = (elements) => {
  return elements[getRoundNumber(0, elements.length - 1)];
};

export const getRandomArray = (array, length) => {
  const arrayCopy = [...array];
  for (let i = 0; i < (array.length - length); i++) {
    arrayCopy.splice(getRoundNumber(0, arrayCopy.length), MIN_ELEMENT)
  }
  return arrayCopy;
}

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
