import { createElement } from '../utils/utils.js';

const createEmptyListTemplate = () => '<p class="trip-events__msg"></p>';

export default class EmptyListView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmptyListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
