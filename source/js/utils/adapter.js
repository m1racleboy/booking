import { getCapacity } from '../utils/util.js';

export const adaptDataToClient = (data) => {
  const adaptedOffer = Object.assign(
    {},
    data,
    {
      extended: {
        capacity: getCapacity(data.offer.guests, data.offer.rooms),
        time: `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`,
      },
    },
  );

  return adaptedOffer;
};
