import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const getTotalPrice = (tripEvents) => {
  let totalPrice = 0;
  tripEvents.forEach((tripEvent) => {
    totalPrice += tripEvent.basePrice;
    tripEvent.offers.offers.forEach((offer) => {
      totalPrice += offer.price;
    });
  });
  return totalPrice;
};

const createTripInfoTemplate = (tripEvents) => {
  const totalPrice = getTotalPrice(tripEvents);

  const getSortedEventsFrom = () => tripEvents.slice().sort((firstEvent, secondEvent) => firstEvent.dateFrom - secondEvent.dateFrom);

  const getSortedEventsTo = () => tripEvents.slice().sort((firstEvent, secondEvent) => firstEvent.dateTo - secondEvent.dateTo);

  const getTripTitle = () => {
    const firstTripEventName = getSortedEventsFrom()[0].destination.name;
    const lastTripEventName = getSortedEventsTo()[tripEvents.length - 1].destination.name;
    const middleTripEventName = getSortedEventsFrom()[Math.floor(tripEvents.length / 2)].destination.name;
    switch (tripEvents.length) {
      case 0:
        return '';
      case 1:
        return firstTripEventName;
      case 2:
        return `${firstTripEventName} &mdash; ${lastTripEventName}`;
      case 3:
        return `${firstTripEventName} &mdash; ${middleTripEventName} &mdash; ${lastTripEventName}`;
      default:
        return `${firstTripEventName} &mdash; ... &mdash; ${lastTripEventName}`;
    }
  };

  const getTripDates = () => {
    const start = dayjs(getSortedEventsFrom()[0].dateFrom);
    const end = dayjs(getSortedEventsTo()[tripEvents.length - 1].dateTo);
    const dateMounthDay = 'DD MMM';
    const dateDay = 'DD';
    return `${start.format(dateMounthDay)}&nbsp;&mdash;&nbsp;${end.format((start.month() === end.month()) ? dateDay : dateMounthDay)}`;
  };

  return tripEvents.length > 0 ? `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getTripTitle()}</h1>

        <p class="trip-info__dates">${getTripDates()}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
  </section>` : '';
};

export default class TripInfoView extends AbstractView {
  #tripEvents = null;

  constructor(tripEvents) {
    super();
    this.#tripEvents = tripEvents;
  }

  get template() {
    return createTripInfoTemplate(this.#tripEvents);
  }
}
