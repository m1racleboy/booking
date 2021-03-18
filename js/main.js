import { getPins } from './map.js';
import { getData } from './api.js';
import { COUNT_OF_PINS } from './constant.js';

getData((offers) => {
  getPins(offers.slice(0, COUNT_OF_PINS));
});
