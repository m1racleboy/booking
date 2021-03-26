export const COUNT_OF_PINS = 10;
export const MIN_PRICE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};
export const MAX_DECIMAL_NUMBERS = 5;
export const MIN_TITLE_LENGTH = 30;
export const MAX_TITLE_LENGTH = 100;
export const MAX_ROOMS = 100;
export const NO_ROOMS = 0;

export const TOKYO_LATITUDE = 35.6895;
export const TOKYO_LONGITUDE = 139.69171;
export const MAIN_PIN = 52;
export const PIN = 40;
export const START_POINTS = `${TOKYO_LATITUDE.toFixed(MAX_DECIMAL_NUMBERS)}, ${TOKYO_LONGITUDE}`;
export const START_POINTS_OBJECT = {
  lat: TOKYO_LATITUDE,
  lng: TOKYO_LONGITUDE,
};
export const ZOOM = 13;

export const MODAL_SHOW_TIME = 5000;
export const RERENDER_DELAY = 500;

export const ERROR_POST_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз';
export const ERROR_GET_MESSAGE = 'Ошибка загрузки данных с сервера!';

export const PRICES = {
  low: 10000,
  high: 50000,
}
