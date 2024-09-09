import { getRandomInteger } from '../utils/common.js';
import { Price, CountOffers, TITLES_OFFER } from './consts.js';

const getPrice = () => getRandomInteger(Price.MIN, Price.MAX);
const getOffersCount = () => getRandomInteger(CountOffers.MIN, CountOffers.MAX);

const getOffer = (id, title) => ({
  id,
  title,
  price: getPrice(),
});

export const getOffers = (type) => {
  const offers = [];
  const offersCount = getOffersCount();
  const offersTitles = TITLES_OFFER.sort(() => getRandomInteger(-1, 1)).slice(0, offersCount);

  for (let i = 0; i < offersCount; i++) {
    offers.push(getOffer(i, offersTitles[i]));
  }

  return {type, offers};
};
