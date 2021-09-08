import { ERROR_GET_MESSAGE, ERROR_POST_MESSAGE } from '../const.js';
import { adaptDataToClient } from '../utils/adapter.js';
import { getSimpleStructure } from '../utils/util.js';

export const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch('https://23.javascript.pages.academy/keksobooking/data');
    const data = response.ok ? await response.json() : await onFail(ERROR_GET_MESSAGE);
    const adaptedOffers = await getSimpleStructure(data.map((offer) => adaptDataToClient(offer)));
    onSuccess(adaptedOffers);
  }
  catch (_) {
    onFail(ERROR_GET_MESSAGE);
  }
};

export const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body,
      },
    );
    response.ok ? await onSuccess() : await onFail(ERROR_GET_MESSAGE);
  }
  catch (_) {
    onFail(ERROR_POST_MESSAGE);
  }
};
