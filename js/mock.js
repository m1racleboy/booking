import { getRoundNumber, getPoint, getRandomArrayElement, getRandomArray } from './util.js';
import {
  MIN_ELEMENTS, MIN_POSITIVE_NUMBER, COUNT_OF_MOCKS, MIN_LOCATION_X, MIN_LOCATION_Y,
  MAX_LOCATION_X, MAX_LOCATION_Y, MIN_PRICE, MAX_PRICE, MAX_GUESTS, MAX_ROOMS,
  MAX_COUNT_OF_AVATARS, MAX_COUNT_OF_DECIMAL_NUMBERS, MAX_FEATURES, MAX_PHOTOS
} from './constant.js'


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
    photos: getRandomArray(PHOTOS, getRoundNumber(MIN_ELEMENTS, MAX_PHOTOS)),
  }
};

const getLocation = () => {
  return {
    x: getPoint(MIN_LOCATION_X, MAX_LOCATION_X, MAX_COUNT_OF_DECIMAL_NUMBERS),
    y: getPoint(MIN_LOCATION_Y, MAX_LOCATION_Y, MAX_COUNT_OF_DECIMAL_NUMBERS),
  }
};

function checkCapacity(guests, rooms) {
  let str = '';

  if (rooms === 1) {
    str = `${rooms} комната для `;
  }
  else if (rooms > 1 && rooms < 5) {
    str = `${rooms} комнаты для `;
  }
  else {
    str = `${rooms} комнат для `;
  }

  if (guests === 1) {
    return str + `${guests} гостя`;
  }
  else {
    return str + `${guests} гостей`;
  }
}

const getExtended = (offer) => {
  return {
    capacity: checkCapacity(offer.guests, offer.rooms),
    time: `Заезд после ${offer.checkin}, выезд после ${offer.checkout}`,
  }
};

const getMockData = () => {
  let objArray = [];
  for (let i = MIN_POSITIVE_NUMBER; i < COUNT_OF_MOCKS; i++) {
    let location = getLocation();
    let offer = getOffer(location);
    objArray[i] = {
      author: {
        avatar: `img/avatars/user0${getRoundNumber(MIN_ELEMENTS, MAX_COUNT_OF_AVATARS)}.png`,
      },
      offer: offer,
      location: location,
      extended: getExtended(offer),
    }
  }
  return objArray;
};

export { getMockData };
