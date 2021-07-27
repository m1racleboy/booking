import { getRoundNumber, getPoint, getRandomArrayElement, getRandomArray } from './util.js';
import {
  MIN_ELEMENT, COUNT_OF_PINS, MIN_LOCATION_X, MIN_LOCATION_Y,
  MAX_LOCATION_X, MAX_LOCATION_Y, MAX_PRICE, MAX_COUNT_OF_AVATARS, MAX_DECIMAL_NUMBERS, MAX_FEATURES, MAX_PHOTOS, MIN_PRICE
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

const getGuestsCount = (rooms) => {
  let guestsCount = [];
  if (rooms < 5) {
    for (let i = 0; i < rooms; i++) {
      guestsCount[i] = GUESTS[i];
    }
    return guestsCount;
  }
  return 'не для гостей';
}

const getCapacity = (guests, rooms) => {
  let capacity;

  switch (rooms) {
    case 1: capacity = `${rooms} комната - `;
      break;
    case 2:
    case 3:
    case 4: capacity = `${rooms} комнаты - `;
      break;
    case 100: capacity = `${rooms} комнат не для гостей.`;
      break;
    default: capacity = `${rooms} комнат - `;
  }

  if (Array.isArray(guests)) {
    capacity += guests.reverse().reduce((acc, value) => {
      if (guests.length > 1) {
        return `${acc} для ${value} гост${value === 1 ? 'я.' : 'ей, '} `;
      }
      return acc + `для ${value} гостя.`;
    }, '');
  }
  return capacity;
}

const getOffer = (location) => {
  const hotelType = getRandomArrayElement(TYPES);
  const roomsCount = getRandomArrayElement(ROOMS);
  const guestsCount = getGuestsCount(roomsCount);

  return {
    title: `Заголовок - ${getRoundNumber(MIN_ELEMENT, COUNT_OF_PINS)}`,
    address: `Координата по x: ${location.lat} Координата по y: ${location.lng}`,
    price: getRoundNumber(MIN_PRICE[hotelType], MAX_PRICE),
    type: hotelType,
    rooms: roomsCount,
    guests: guestsCount,
    checkin: TIME,
    checkout: TIME,
    features: getRandomArray(FEATURES, getRoundNumber(MIN_ELEMENT, MAX_FEATURES)),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomArray(PHOTOS, getRoundNumber(MIN_ELEMENT, MAX_PHOTOS)),
  };
}


const getLocation = () => ({
  lat: getPoint(MIN_LOCATION_X, MAX_LOCATION_X, MAX_DECIMAL_NUMBERS),
  lng: getPoint(MIN_LOCATION_Y, MAX_LOCATION_Y, MAX_DECIMAL_NUMBERS),
});

const getExtended = (offer) => ({
  time: `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`,
  capacity: getCapacity(offer.guests, offer.rooms),
});

export const getMockData = () => {
  const mockArray = [];
  for (let i = 0; i < COUNT_OF_PINS; i++) {
    const location = getLocation();
    const offer = getOffer(location);
    mockArray[i] = {
      author: {
        avatar: `img/avatars/user0${getRoundNumber(MIN_ELEMENT, MAX_COUNT_OF_AVATARS)}.png`,
      },
      offer: offer,
      location: location,
    }

    mockArray[i].extended = getExtended(offer);
  }
  return mockArray;
};
