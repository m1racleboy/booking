import { getMockData } from './mock.js';
import { getRoundNumber } from './util.js';

const HOUSE_TYPES = {
  palace: 'Дворец',
  house: 'Дом',
  flat: 'Квартира',
  bungalow: 'Бунгало',
};

const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarOfferList = document.querySelector('#map-canvas');
const similarCards = getMockData();
const nodes = Array.from(similarCardTemplate.children);
similarOfferList.insertAdjacentHTML('beforeend',
  '<article class="popup"></article>');
const offerElement = similarOfferList.querySelector('.popup');

const getSimpleStructure = (currentOffer) => {
  delete currentOffer.location.x;
  delete currentOffer.location.y;
  delete currentOffer.offer.guests;
  delete currentOffer.offer.rooms;
  delete currentOffer.offer.checkin;
  delete currentOffer.offer.checkout;
  const { author, offer, point, extended } = currentOffer;
  const simpleObj = Object.assign({}, author, offer, point, extended);
  return simpleObj;
}

const renderPhotos = (photos, photoElement) => {
  photoElement.textContent = '';
  photos.forEach((item) => {
    photoElement.insertAdjacentHTML('beforeend',
      `<img src=${item} class="popup__photo" width="50" height="50" alt="Фотография жилья"></img>`);
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

    offerElement.appendChild(node);
  });
}

createOffer(currentOffer);
