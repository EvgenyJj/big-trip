import { createElement } from '../utils/utils.js';

const createTripEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventsListView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripEventsListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
