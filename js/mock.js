import { getRoundNumber, getPoint, getRandomArrayElement, getRandomArray } from './util.js';

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

const NUMBER_OF_OBJECTS = 10;

const getOffer = (location) => {
  return {
    title: `Заголовок - ${getRoundNumber(1, 10)}`,
    address: `Координата по x: ${location.x} Координата по y: ${location.y}`,
    price: getRoundNumber(2000, 10000),
    type: getRandomArrayElement(TYPES),
    rooms: getRoundNumber(1, 4),
    guests: getRoundNumber(4, 20),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: getRandomArray(FEATURES, getRoundNumber(1, 7)),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomArrayElement(PHOTOS),
  }
};

const getLocation = () => {
  return {
    x: getPoint(35.65, 35.7, 5),
    y: getPoint(139.7, 139.8, 5),
  }
};

const getMockData = () => {
  let objArray = [];
  for (let i = 0; i < NUMBER_OF_OBJECTS; i++) {
    let location = getLocation();
    objArray[i] = {
      author: {
        avatar: `img/avatars/user0${getRoundNumber(0, 9)}.png`,
      },
      offer: getOffer(location),
      location: location,
    }
  }
  return objArray;
};

export { getMockData };
