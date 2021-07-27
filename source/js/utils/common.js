export const getRandomPositiveFloat = (min, max, digits = 1) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

export const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

export const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

export const getRandomArray = (array, length) => {
  const arrayCopy = [...array];
  for (let index = 0; index < (array.length - length); index++) {
    arrayCopy.splice(~~getRandomPositiveInteger(0, arrayCopy.length), 1);
  }
  return arrayCopy;
};
