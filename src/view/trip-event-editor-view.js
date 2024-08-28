import dayjs from 'dayjs';
import { CITY_NAMES, TYPES_EVENT } from '../mock/consts.js';

export const createTripEventEditorTemplate = ({basePrice, dateFrom, dateTo, destination, offers, type}, isNewEvent = false) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  const checkEventType = (eventType) => type === eventType ? 'checked' : '';

  const getEventsListTemplate = () => TYPES_EVENT.map((tripEvent) =>
    `<div class="event__type-item">
      <input id="event-type-${tripEvent}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripEvent}" ${checkEventType(tripEvent)}>
      <label class="event__type-label  event__type-label--${tripEvent}" for="event-type-${tripEvent}-1">${tripEvent}</label>
    </div>`).join('');

  const getDestinationListTemplate = () => CITY_NAMES.map((name) => `<option value="${name}"></option>`).join('');

  const getEditorResetButtonsTemplate = () => isNewEvent ?
    '<button class="event__reset-btn" type="reset">Close</button>' :
    `<button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`;

  const getOffersListTemplate = () =>
    `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offers.offers.map(({id, title, price}) => `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}">
                <label class="event__offer-label" for="event-offer-${id}">
                  <span class="event__offer-title">${title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${price}</span>
                </label>
              </div>`).join('')}
            </div>
        </section>`;

  const getDestinationPicturesTemplate = () =>
    `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${destination.pictures.map(({src, description}) =>`<img class="event__photo" src="${src}" alt="${description}">`).join('')}
            </div>
          </div>`;

  const getDestinationDescriptionTemplate = () =>
    `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
            ${destination.pictures.length > 0 ? getDestinationPicturesTemplate() : ''}
          </section>`;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${getEventsListTemplate()}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${getDestinationListTemplate()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${start.format('DD/MM/YY HH:mm')}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${end.format('DD/MM/YY HH:mm')}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  ${getEditorResetButtonsTemplate()}
                </header>
                <section class="event__details">
                ${offers.offers.length > 0 ? getOffersListTemplate() : ''}
                ${destination.description.length > 0 ? getDestinationDescriptionTemplate() : ''}
                </section>
              </form>
            </li>`;
};
