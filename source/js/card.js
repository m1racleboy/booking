
export const createCardTemplate = (card) => {
  const { avatar, title, description, price, type, address, photos, features, capacity, time } = card;

  return (
    `<article class="popup">
      <img src="${avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title">${title}</h3>
      <p class="popup__text popup__text--address">${address}</p>
      <p class="popup__text popup__text--price">${price} <span>₽/ночь</span></p>
      <h4 class="popup__type">${type}</h4>
      <p class="popup__text popup__text--capacity">${capacity}</p>
      <p class="popup__text popup__text--time">${time}</p>
      <ul class="popup__features">
        ${features ? features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join('') : ''}
      </ul>
      <p class="popup__description">${description}</p>
      <div class="popup__photos">
        ${photos ? photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('') : ''}
      </div>
    </article>`
  );
};
