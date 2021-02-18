import { getMockData } from './mock.js';

const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarOfferList = document.querySelector('#map-canvas');
const similarCards = getMockData();

const similarCardFragment = document.createDocumentFragment();

const insertImages = (photos, photoElement) => {
  photos.forEach((item) => {
    photoElement.insertAdjacentHTML('beforeend',
      `<img src=${item} class="popup__photo" width="50" height="50" alt="Фотография жилья"></img>`)
  });
}

const checkCapacity = (guests, rooms) => {
  let str = '';

  if (rooms === 1) str = `${rooms} комната для `;
  else if (rooms > 1 && rooms < 5) str = `${rooms} комнаты для `;
  else str = `${rooms} комнат для `;

  if (guests === 1) return str + `${guests} гостя`;
  else return str + `${guests} гостей`;
}

const appendFeatures = () => {
  //todo добавлять лишки через аппендчайилд
}

const checkType = (type) => {

  switch (type) {
    case 'palace':
      return 'Дворец';
      break;
    case 'house':
      return 'Дом';
      break;
    case 'flat':
      return 'Квартира';
      break;
    case 'bungalow':
      return 'Бунгало';
      break;
  }
}

similarCards.forEach((deal) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  if (deal.offer.title == "") {
    cardElement.querySelector('.popup__title').classList.add('hidden');
  }
  else {
    cardElement.querySelector('.popup__title').textContent = deal.offer.title;
  }
  if (deal.offer.address == "") {
    cardElement.querySelector('.popup__text--address').classList.add('hidden')
  }
  else {
    cardElement.querySelector('.popup__text--address').textContent = deal.offer.address;
  }
  cardElement.querySelector('.popup__text--price').textContent = `${deal.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = checkType(deal.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = checkCapacity(deal.offer.guests, deal.offer.rooms);
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${deal.offer.checkin}, выезд до ${deal.offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = deal.offer.features;
  cardElement.querySelector('.popup__description').textContent = deal.offer.description;
  let photoElement = cardElement.querySelector('.popup__photos');
  let photoElementChild = cardElement.querySelector('.popup__photo');
  // коммент для пояснения заранее, после замечаний удалю, удаляю появляющийся img из src = 'inknown',
  // не придумал, как по-другому от него избавиться
  photoElement.removeChild(photoElementChild);
  insertImages(deal.offer.photos, photoElement);

  cardElement.querySelector('.popup__avatar').src = deal.author.avatar;
  similarCardFragment.appendChild(cardElement);
});
console.log(similarCardFragment);
similarOfferList.appendChild(similarCardFragment);
