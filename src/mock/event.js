import { getRandomInteger } from '../utils/common.js';
import { TYPES_EVENT, Price, MAX_MINUTES_GAP } from './consts.js';
import { getDestination } from './destination.js';
import { getOffers } from './offers.js';
import dayjs from 'dayjs';

const getTypeEvent = () => TYPES_EVENT[getRandomInteger(0, TYPES_EVENT.length - 1)];
const getBasePrice = () => getRandomInteger(Price.MIN, Price.MAX);
const getDate = () => dayjs().add(getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP), 'minute');

let id = 0;
const getId = () => {
  id++;
  return id;
};

export const getTripEvent = () => {
  const type = getTypeEvent();
  const startDate = getDate();
  const endDate = getDate();

  return {
    basePrice: getBasePrice(),
    dateFrom: dayjs(Math.min(startDate, endDate)).format(),
    dateTo: dayjs(Math.max(startDate,endDate)).format(),
    destination: getDestination(),
    id: getId(),
    isFavorite: Boolean(getRandomInteger()),
    offers: getOffers(type),
    type,
  };
};

