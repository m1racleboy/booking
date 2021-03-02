import { getRoundNumber, getPoint, getRandomArrayElement, getRandomArray } from './util.js';
import {
  MIN_ELEMENTS, MIN_POSITIVE_NUMBER, COUNT_OF_MOCKS, MIN_LOCATION_X, MIN_LOCATION_Y,
  MAX_LOCATION_X, MAX_LOCATION_Y, MAX_PRICE, MAX_COUNT_OF_AVATARS, MAX_COUNT_OF_DECIMAL_NUMBERS, MAX_FEATURES, MAX_PHOTOS
} from './constant.js'


const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const TIME = `${getRoundNumber(12, 14)}:00`;

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

const ROOMS = [1, 2, 3, 100];
const GUESTS = [1, 2, 3, 'не для гостей'];

const getOffer = (location) => ({
  title: `Заголовок - ${getRoundNumber(MIN_ELEMENTS, COUNT_OF_MOCKS)}`,
  address: `Координата по x: ${location.x} Координата по y: ${location.y}`,
  price: getRoundNumber(0, MAX_PRICE),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomArrayElement(ROOMS),
  guests: 0,
  checkin: TIME,
  checkout: TIME,
  features: getRandomArray(FEATURES, getRoundNumber(MIN_ELEMENTS, MAX_FEATURES)),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getRandomArray(PHOTOS, getRoundNumber(MIN_ELEMENTS, MAX_PHOTOS)),
});

const getLocation = () => ({
  x: getPoint(MIN_LOCATION_X, MAX_LOCATION_X, MAX_COUNT_OF_DECIMAL_NUMBERS),
  y: getPoint(MIN_LOCATION_Y, MAX_LOCATION_Y, MAX_COUNT_OF_DECIMAL_NUMBERS),
});

function getCapacity(guests, rooms) {
  if (typeof guests === 'number') {
    let str = `${rooms} комнат для `;

    if (rooms <= 5) {
      str = `${rooms} ${rooms === 1 ? 'комната' : 'комнаты'} для `;
    }

    return str + `${guests} ${guests === 1 ? 'гостя' : 'гостей'}`;
  }
  return `${rooms} комнат не для гостей`;
}

const getExtended = (offer) => ({
  time: `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`,
  capacity: getCapacity(offer.guests, offer.rooms),
});

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
    }

    objArray[i].offer.rooms === 100 ? objArray[i].offer.guests = GUESTS[GUESTS.length - 1]
      : objArray[i].offer.guests = getRoundNumber(1, objArray[i].offer.rooms);

    objArray[i].extended = getExtended(offer);

    if (objArray[i].offer.type === 'flat') {
      objArray[i].offer.price = getRoundNumber(1000, MAX_PRICE);
    }
    else if (objArray[i].offer.type === 'house') {
      objArray[i].offer.price = getRoundNumber(5000, MAX_PRICE);
    }
    else if (objArray[i].offer.type === 'palace') {
      objArray[i].offer.price = getRoundNumber(10000, MAX_PRICE);
    }
  }
  return objArray;
};
export { getMockData };
