import { MIN_ELEMENT, MODAL_SHOW_TIME } from './constant.js';
import { openModal, closeModal } from './user-modal.js';

const getRandomNumber = (min, max) => {
  min = +min;
  max = +max;

  if ((max >= min) && (min >= 0) && (max > 0)) {
    return Math.random() * (max - min) + min;
  }
  else {
    return 0;
  }
};

const getRoundNumber = (min, max) => {
  return Math.round(getRandomNumber(min, max));
}

const getPoint = (x, y, numberOfSings = 0) => {
  let result = getRandomNumber(x, y);
  numberOfSings = +numberOfSings;
  result = numberOfSings >= 0 ? +result.toFixed(numberOfSings) : 0;
  return result;
};

const getRandomArrayElement = (elements) => {
  return elements[getRoundNumber(0, elements.length - 1)];
};

const getRandomArray = (array, length) => {
  const arrayCopy = [...array];
  for (let i = 0; i < (array.length - length); i++) {
    arrayCopy.splice(getRoundNumber(0, arrayCopy.length), MIN_ELEMENT)
  }
  return arrayCopy;
}

const showModal = (response) => {
  openModal(response);

  setTimeout(() => {
    closeModal(response);
  }, MODAL_SHOW_TIME);
}

export { getRoundNumber, getPoint, getRandomArrayElement, getRandomArray, showModal };
