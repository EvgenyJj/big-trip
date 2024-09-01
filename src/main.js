import './mock/event.js';
import { createTripInfoTemplate } from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import { createTripEventTemplate } from './view/trip-event-view.js';
import { createTripEventEditorTemplate } from './view/trip-event-editor-view.js';
import { renderTemplate, RenderPosition, renderElement } from './utils/utils.js';
import { getTripEvent } from './mock/event.js';
import TabsView from './view/tabs-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripEventsListView from './view/trip-events-list-view.js';
import SortView from './view/sort-view.js';

const TRIP_EVENTS_COUNT = 18;

const tripEvents = Array.from({length: TRIP_EVENTS_COUNT}, getTripEvent);

const tripMainElement = document.querySelector('.trip-main');
const menuElement = tripMainElement.querySelector('.trip-controls__navigation');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

renderTemplate(tripMainElement, createTripInfoTemplate(tripEvents), RenderPosition.AFTERBEGIN);
renderElement(menuElement, new TabsView().element);
renderElement(filterElement, new FilterView().element);
renderElement(tripEventsElement, new SortView().element);
renderElement(tripMainElement, new NewEventButtonView().element);
renderElement(tripEventsElement, new TripEventsListView().element);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

renderTemplate(tripEventsListElement, createTripEventEditorTemplate(tripEvents[0]));

for (let i = 1; i < TRIP_EVENTS_COUNT; i++) {
  renderTemplate(tripEventsListElement, createTripEventTemplate(tripEvents[i]));
}
