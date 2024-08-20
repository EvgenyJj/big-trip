import { createTripInfoTemplate } from './view/trip-info-view.js';
import { createMenuTemplate } from './view/menu-view.js';
import { createFilterTemplate } from './view/filter-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createTripEventsListTemplate } from './view/trip-events-list-view.js';
import { createTripEventTemplate } from './view/trip-event-view.js';
import { createTripEventEditorTemplate } from './view/trip-event-editor-view.js';
import { renderTemplate, RenderPosition } from './render.js';

const TRIP_EVENT_COUNT = 3;

const tripMainElement = document.querySelector('.trip-main');
const menuElement = tripMainElement.querySelector('.trip-controls__navigation');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

renderTemplate(tripMainElement, createTripInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(menuElement, createMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filterElement, createFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createTripEventsListTemplate(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

for (let i = 1; i <= TRIP_EVENT_COUNT; i++) {
  renderTemplate(tripEventsListElement, createTripEventTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(tripEventsListElement, createTripEventEditorTemplate(), RenderPosition.AFTERBEGIN);
