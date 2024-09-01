import { createElement } from '../utils/utils.js';

const createTabsTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`
);

export default class TabsView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTabsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
