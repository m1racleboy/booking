'use strict'

const TITLES = [
  'Заголовок - 1',
  'Заголовок - 2',
  'Заголовок - 3',
  'Заголовок - 4',
  'Заголовок - 5',
  'Заголовок - 6',
  'Заголовок - 7',
  'Заголовок - 8',
];

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

const sendReport = () => {
  alert('Некорректный ввод');
  return 0;
};

const getRandom = (min, max) => {
  min = +min;
  max = +max;

  if ((max >= min) && (min >= 0) && (max > 0)) {
    return Math.random() * (max - min) + min;
  }

  else {
    return sendReport();
  }

}

const getPoint = (x, y, numberOfSings = 0) => {
  let result = getRandom(x, y);
  numberOfSings = +numberOfSings;
  result = numberOfSings >= 0 ? +result.toFixed(numberOfSings) : sendReport();
  return result;
}

const getRandomArrayElement = (elements) => {
  return elements[Math.round(getRandom(0, elements.length - 1))];
};

const createAuthor = () => {
  return {
    avatar: `img/avatars/user0${Math.round(getRandom(0, 9))}.png`,
  }
}

const createOffer = (locationNumber) => {
  let featureItems = [];

  for (let i = 0; i < Math.round(getRandom(1, 7)); i++) {
    featureItems[i] = getRandomArrayElement(FEATURES);
  }

  for (let i = 0; i < featureItems.length; i++) {
    for (let j = 0; j < i; j++) {
      if (featureItems[i] === featureItems[j]) {
        featureItems.splice(j, 1);
      }
    }
  }

  return {
    title: getRandomArrayElement(TITLES),
    address: `Координата по x: ${LOCATIONS[locationNumber].x} Координата по y: ${LOCATIONS[locationNumber].y}`,
    price: Math.round(getRandom(8000, 100000)),
    type: getRandomArrayElement(TYPES),
    rooms: Math.round(getRandom(1, 3)),
    guests: Math.round(getRandom(4, 20)),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: featureItems,
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomArrayElement(PHOTOS),
  }
}

const createLocation = () => {
  return {
    x: getPoint(35.65000, 35.70000, 5),
    y: getPoint(139.70000, 139.80000, 5),
  }
}

const LOCATIONS = [];

for (let i = 0; i < 10; i++) {
  LOCATIONS[i] = createLocation();
}

const returnObject = () => {
  let objArray = [];
  for (let i = 0; i < 10; i++) {
    objArray[i] = {
      author: createAuthor(),
      offer: createOffer(i),
      location: LOCATIONS[i],
    }
  }
  return objArray;
}

returnObject();
