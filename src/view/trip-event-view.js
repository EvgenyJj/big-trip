import dayjs from 'dayjs';
import { createElement } from '../utils/utils';

const createOffersTemplate = (offers) => offers.offers.map(({title, price}) =>
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`).join('');

const getTimeDifference = (start, end) => {
  const timeDifference = end.diff(start, 'minutes');
  const minutesDifference = timeDifference % 60 > 0 ? `${timeDifference % 60}M` : '';
  const hoursDifference = Math.floor(timeDifference / 60) % 24 > 0 ? `${Math.floor(timeDifference / 60) % 24}H ` : '';
  const daysDifference = Math.floor((timeDifference / 60) / 24) > 0 ? `${Math.floor((timeDifference / 60) / 24)}D ` : '';
  return daysDifference + hoursDifference + minutesDifference;
};

const checkFavorite = (isFavorite) => isFavorite ? 'event__favorite-btn--active' : '';

const createTripEventTemplate = (tripEvent) => {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = tripEvent;
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  const offersTemplate = createOffersTemplate(offers);
  const timeDifference = getTimeDifference(start, end);
  const favorite = checkFavorite(isFavorite);

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${start.format('YYYY-MM-DD')}">${start.format('MMM DD')}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${start.format('YYYY-MM-DDTHH:mm')}">${start.format('HH:mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${end.format('YYYY-MM-DDTHH:mm')}">${end.format('HH:mm')}</time>
                  </p>
                  <p class="event__duration">${timeDifference}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                    ${offers.offers.length > 0 ? offersTemplate : ''}
                </ul>
                <button class="event__favorite-btn ${favorite}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class TripEventView {
  #element = null;
  #tripEvent = null;

  constructor(tripEvent) {
    this.#tripEvent = tripEvent;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripEventTemplate(this.#tripEvent);
  }

  removeElement() {
    this.#element = null;
  }
}
