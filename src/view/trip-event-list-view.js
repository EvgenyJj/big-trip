import AbstractView from './abstract-view.js';

const createTripEventListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventListView extends AbstractView {
  get template() {
    return createTripEventListTemplate();
  }
}
