'use strict'

const getRandom = (min, max) => {
  if ((max > min) && (min >= 0) && (max >= 0)) {
    return parseFloat(Math.random() * (max - min) + min);
  }

  else if ((min <= 0) || (max <= 0)) {
    return 'Значения должны быть положительными';
  }

  return 'Значение "от" больше либо равно значению "до"';
}

const getPoint = (x, y, numberOfSings) => {
  let result = getRandom(x, y);

  if (typeof result === 'number') {
    return parseFloat(result.toFixed(numberOfSings));
  }

  return result;
}

getPoint(1, 48, 8);
