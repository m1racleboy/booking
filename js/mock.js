import { getRoundNumber, getPoint } from './util.js';
import { MIN_ELEMENTS, MIN_POSITIVE_NUMBER, COUNT_OF_MOCKS, MIN_LOCATION_X, MIN_LOCATION_Y,
  MAX_LOCATION_X, MAX_LOCATION_Y, MIN_PRICE, MAX_PRICE, MAX_GUESTS, MAX_ROOMS,
  MAX_COUNT_OF_AVATARS, MAX_COUNT_OF_DECIMAL_NUMBERS, MAX_FEATURES } from './constant.js'


const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, culpa. Eaque beatae dolorem quas exercitationem nemo iure quibusdam iste facilis, aperiam suscipit itaque deleniti obcaecati fugit at deserunt fuga non?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit voluptatibus odit, accusantium quisquam corrupti, nobis ex distinctio debitis repudiandae perspiciatis a nihil? Sequi delectus similique odio cum. Itaque, eligendi aliquid?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis odit, voluptatum inventore neque quibusdam blanditiis mollitia sunt doloribus, accusantium ipsum animi. Nulla optio ex sapiente ut quas deserunt, sed laborum?',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getRandomArrayElement = (elements) => {
  return elements[getRoundNumber(MIN_POSITIVE_NUMBER, elements.length)];
};

const getRandomArray = (array, length) => {
  const arrayCopy = [...array];
  for (let i = MIN_POSITIVE_NUMBER; i < (array.length - length); i++) {
    arrayCopy.splice(getRoundNumber(MIN_POSITIVE_NUMBER, arrayCopy.length), MIN_ELEMENTS)
  }
  return arrayCopy;
}

const getOffer = (location) => {
  return {
    title: `Заголовок - ${getRoundNumber(MIN_ELEMENTS, COUNT_OF_MOCKS)}`,
    address: `Координата по x: ${location.x} Координата по y: ${location.y}`,
    price: getRoundNumber(MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(TYPES),
    rooms: getRoundNumber(MIN_ELEMENTS, MAX_ROOMS),
    guests: getRoundNumber(MIN_ELEMENTS, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: getRandomArray(FEATURES, getRoundNumber(MIN_ELEMENTS, MAX_FEATURES)),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomArrayElement(PHOTOS),
  }
};

const getLocation = () => {
  return {
    x: getPoint(MIN_LOCATION_X, MAX_LOCATION_X, MAX_COUNT_OF_DECIMAL_NUMBERS),
    y: getPoint(MIN_LOCATION_Y, MAX_LOCATION_Y, MAX_COUNT_OF_DECIMAL_NUMBERS),
  }
};

const getMockData = () => {
  let objArray = [];
  for (let i = MIN_POSITIVE_NUMBER; i < COUNT_OF_MOCKS; i++) {
    let location = getLocation();
    objArray[i] = {
      author: {
        avatar: `img/avatars/user0${getRoundNumber(MIN_ELEMENTS, MAX_COUNT_OF_AVATARS)}.png`,
      },
      offer: getOffer(location),
      location: location,
    }
  }
  return objArray;
};

export { getMockData };
