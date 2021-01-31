'use strict'

const getRandom = (min, max) => {
  min = +min;
  max = +max;

  if ((max >= min) && (min >= 0) && (max >= 0)) {
    return Math.random() * (max - min) + min;
  }

  else {
    alert('Некорректный ввод');
    return 0;
  }

}

const getPoint = (x, y, numberOfSings) => {
  let result = getRandom(x, y);
  numberOfSings = +numberOfSings;

  if (numberOfSings >= 0) {
    return +result.toFixed(numberOfSings);
  }

  else {
    alert('Некорректный ввод');
    return 0;
  }

}

getPoint(1, 48, 8);
