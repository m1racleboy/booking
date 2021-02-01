'use strict'

const reportMessage = () => {
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
    return reportMessage();
  }

}

const getPoint = (x, y, numberOfSings) => {
  let result = getRandom(x, y);
  numberOfSings = +numberOfSings;
  numberOfSings >= 0 ? result = +result.toFixed(numberOfSings) : result = reportMessage();
  return result;
}

getPoint(12, 23, 3);
