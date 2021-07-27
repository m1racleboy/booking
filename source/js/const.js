export const MIN_ELEMENT = 1;
export const MAX_DECIMAL_NUMBERS = 5;
export const MIN_TITLE_LENGTH = 30;
export const MAX_TITLE_LENGTH = 100;
export const MAX_ROOMS = 100;
export const MAX_PRICE = 1000000;
export const TOKYO_LATITUDE = 35.6895;
export const TOKYO_LONGITUDE = 139.69171;
export const PIN = 40;
export const MAIN_PIN = 52;
export const START_POINTS = `${TOKYO_LATITUDE.toFixed(MAX_DECIMAL_NUMBERS)}, ${TOKYO_LONGITUDE}`;
export const ZOOM = 13;
export const COUNT_OF_PINS = 10;
export const MODAL_SHOW_TIME = 5000;
export const HALF_VALUE_OF_PIN = 2;
export const DEBOUNCE_DELAY = 500;
export const ERROR_POST_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз.';
export const ERROR_GET_MESSAGE = 'Ошибка загрузки данных с сервера!';
export const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
export const DEFAULT_AVATAR_PREVIEW = 'img/muffin-grey.svg';

export const RoomsCount = {
  ONE_ROOM_VALUE: 1,
  TWO_ROOMS_VALUE: 2,
  THREE_ROOMS_VALUE: 3,
  FOUR_ROOMS_VALUE: 4,
  HUNDRED_ROOMS_VALUE: 100,
};

export const MIN_PRICE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

export const START_POINTS_OBJECT = {
  lat: TOKYO_LATITUDE,
  lng: TOKYO_LONGITUDE,
};

export const PRICES = {
  low: 10000,
  high: 50000,
};
