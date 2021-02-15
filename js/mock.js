import { getRoundNumber, getPoint } from './util.js';
import { TYPES, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTIONS, PHOTOS, MIN_ELEMENT, MIN_POSITIVE_NUMBER, NUMBER_OF_OBJECTS, MIN_ELEMENT_X, MIN_ELEMENT_Y, MAX_ELEMENT_X, MAX_ELEMENT_Y, MIN_PRICE, MAX_PRICE, MAX_GUESTS, MAX_ROOMS, MAX_AVATARS, DECIMAL_PLACES, MAX_FEATURES } from './constant.js'

const getRandomArrayElement = (elements) => {
  return elements[getRoundNumber(MIN_POSITIVE_NUMBER, elements.length)];
};

const getRandomArray = (array, length) => {
  const arrayCopy = [...array];
  for (let i = MIN_POSITIVE_NUMBER; i < (array.length - length); i++) {
    arrayCopy.splice(getRoundNumber(MIN_POSITIVE_NUMBER, arrayCopy.length), MIN_ELEMENT)
  }
  return arrayCopy;
}

const getOffer = (location) => {
  return {
    title: `Заголовок - ${getRoundNumber(MIN_ELEMENT, NUMBER_OF_OBJECTS)}`,
    address: `Координата по x: ${location.x} Координата по y: ${location.y}`,
    price: getRoundNumber(MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(TYPES),
    rooms: getRoundNumber(MIN_ELEMENT, MAX_ROOMS),
    guests: getRoundNumber(MIN_ELEMENT, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: getRandomArray(FEATURES, getRoundNumber(MIN_ELEMENT, MAX_FEATURES)),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomArrayElement(PHOTOS),
  }
};

const getLocation = () => {
  return {
    x: getPoint(MIN_ELEMENT_X, MAX_ELEMENT_X, DECIMAL_PLACES),
    y: getPoint(MIN_ELEMENT_Y, MAX_ELEMENT_Y, DECIMAL_PLACES),
  }
};

const getMockData = () => {
  let objArray = [];
  for (let i = MIN_POSITIVE_NUMBER; i < NUMBER_OF_OBJECTS; i++) {
    let location = getLocation();
    objArray[i] = {
      author: {
        avatar: `img/avatars/user0${getRoundNumber(MIN_ELEMENT, MAX_AVATARS)}.png`,
      },
      offer: getOffer(location),
      location: location,
    }
  }
  return objArray;
};

export { getMockData };
