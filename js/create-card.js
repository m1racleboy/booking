import { getMockData } from './mock.js';
import { getRoundNumber } from './util.js';

const HOUSE_TYPES = {
  palace: 'Дворец',
  house: 'Дом',
  flat: 'Квартира',
  bungalow: 'Бунгало',
};

const fields = [
  'guests',
  'rooms',
  'checkin',
  'checkout',
];

const popup = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
const similarOfferList = document.querySelector('#map-canvas');
const similarCards = getMockData();
const nodes = Array.from(popup.children);
similarOfferList.appendChild(popup);
popup.classList.add('hidden');

const getSimpleStructure = (currentOffer) => {
  const { author, offer, location, extended } = currentOffer;
  currentOffer = Object.assign({}, author, offer, location, extended);
  fields.forEach(field => delete currentOffer[field]);
  return currentOffer;
}

const renderPhotos = (photos, photoElement) => {
  photoElement.textContent = '';
  photos.forEach((item) => {
    photoElement.insertAdjacentHTML('beforeend',
      `<img src=${item} class="popup__photo" width="50" height="50" alt="Фотография жилья">`);
  });
}

const renderFeatures = (features, featureElement) => {
  featureElement.textContent = '';
  features.forEach((item) => {
    featureElement.insertAdjacentHTML('beforeend',
      `<li class="popup__feature popup__feature--${item}"></li>`);
  });
}

const currentOffer = similarCards[getRoundNumber(0, 9)];

const createOffer = (currentOffer) => {
  const offer = getSimpleStructure(currentOffer);
  const keys = Object.keys(offer);
  const classes = nodes.map(item => item.classList.value);
  classes.forEach((item, i) => {

    const key = keys.find(key => item.includes(key));
    const value = offer[key];
    const node = nodes[i];

    if (!key || !value || value.length === 0) {
      node.classList.add('hidden');
    }

    if (!Array.isArray(value) && key !== 'avatar') {
      node.textContent = value;
    }

    if (key === 'features') {
      renderFeatures(value, node);
    }

    if (key === 'photos') {
      renderPhotos(value, node);
    }

    if (key === 'type') {
      node.textContent = HOUSE_TYPES[value];
    }

    node.src = value;
  });
}

createOffer(currentOffer);

export { similarCards };
