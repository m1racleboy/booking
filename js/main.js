'use strict'

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if ((max > min) && (min >= 0) && (max >= 0)) {
    return Math.random() * (max - min) + min;
  }

  else if ((min <= 0) || (max <= 0)) {
    return 'Значения должны быть положительными';
  }

  return 'Значение "от" больше либо равно значению "до"';
}

const getPoint = (x, y, numberOfSings) => {
  if ((y > x) && (x >= 0) && (y >= 0)) {
    return parseFloat((Math.random() * (y - x) + x).toFixed(numberOfSings));
  }

  else if ((x <= 0) || (y <= 0)) {
    return 'Значения должны быть положительными';
  }

  return 'Значение "от" больше либо равно значению "до"';
}

getRandom(2, 28);
getPoint(1, 48, 8);
