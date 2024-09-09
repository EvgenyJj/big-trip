import { getRandomInteger } from '../utils/common.js';
import { CITY_NAMES, CountDestinationDescription, CountDestinationPicture, DESCRIPTION } from './consts.js';

const getPicture = () => `https://loremflickr.com/248/152/travel?random=${Math.random()}`;
const getCountPicture = () => getRandomInteger(CountDestinationPicture.MIN, CountDestinationPicture.MAX);
const getCityName = () => CITY_NAMES[getRandomInteger(0, CITY_NAMES.length - 1)];
const getDescriptionCount = () => getRandomInteger(CountDestinationDescription.MIN, CountDestinationDescription.MAX);

export const getDestinationDescription = () => {
  const description = `${DESCRIPTION.replace(/\.\s*$/, '').split('. ').sort(() => getRandomInteger(1, -1)).slice(0, getDescriptionCount()).join('. ')}.`;

  return description;
};

const getPictures = () => {
  const pictures = [];
  const countPicture = getCountPicture();

  for (let i = 1; i <= countPicture; i++) {
    pictures.push(
      {
        src: getPicture(),
        description: `Description photo ${i}`,
      }
    );
  }

  return pictures;
};

export const getDestination = () => ({
  description: getDestinationDescription(),
  name: getCityName(),
  pictures: getPictures(),
});
