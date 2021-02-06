'use strict'

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

const getPoint = (x, y, numberOfSings = 0) => {
  let result = getRandomNumber(x, y);
  numberOfSings = +numberOfSings;
  result = numberOfSings >= 0 ? +result.toFixed(numberOfSings) : 0;
  return result;
};

const getRandomArrayElement = (elements) => {
  return elements[~~getRandomNumber(0, elements.length)];
};

const getFeaturesArray = () => {
  let featureItems = [];

  for (let i = 0; i < Math.round(getRandomNumber(1, 7)); i++) {
    featureItems[i] = getRandomArrayElement(FEATURES);
  }

  featureItems.sort();

  for (let i = 0; i < featureItems.length; i++) {
    let count = 0;
    for (let j = i + 1; j < featureItems.length; j++) {
      if (featureItems[i] === featureItems[j]) {
        count++;
      }
    }
    if (count > 0) {
      featureItems.splice(i + 1, count);
    }
  }
  return featureItems;
};

const createOffer = (location) => {
  return {
    title: `Заголовок - ${~~getRandomNumber(1, 10)}`,
    address: `Координата по x: ${location.x} Координата по y: ${location.y}`,
    price: ~~getRandomNumber(2000, 10000),
    type: getRandomArrayElement(TYPES),
    rooms: ~~getRandomNumber(1, 3),
    guests: ~~getRandomNumber(4, 20),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: getFeaturesArray(),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomArrayElement(PHOTOS),
  }
};

const createLocation = () => {
  return {
    x: getPoint(35.65, 35.7, 5),
    y: getPoint(139.7, 139.8, 5),
  }
};

const returnMockData = () => {
  let objArray = [];
  for (let i = 0; i < NUMBER_OF_OBJECTS; i++) {
    let location = createLocation();
    objArray[i] = {
      author: {
        avatar: `img/avatars/user0${~~getRandomNumber(0, 9)}.png`,
      },
      offer: createOffer(location),
      location: location,
    }
  }
  return objArray;
};

returnMockData();
