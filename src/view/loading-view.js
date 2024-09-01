import { createElement } from '../utils/utils.js';

const createLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class LoadingView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createLoadingTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
