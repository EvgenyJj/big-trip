import { createElement } from '../utils/utils.js';

const createTripEventListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventListView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripEventListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
