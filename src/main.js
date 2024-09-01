import TripInfoView from './view/trip-info-view.js';
import TripEventView from './view/trip-event-view.js';
import TripEventEditorView from './view/trip-event-editor-view.js';
import TabsView from './view/tabs-view.js';
import FilterView from './view/filter-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripEventsListView from './view/trip-events-list-view.js';
import SortView from './view/sort-view.js';
import { RenderPosition, render } from './utils/utils.js';
import { getTripEvent } from './mock/event.js';

const TRIP_EVENTS_COUNT = 18;

const tripEvents = Array.from({length: TRIP_EVENTS_COUNT}, getTripEvent);

const tripMainElement = document.querySelector('.trip-main');
const menuElement = tripMainElement.querySelector('.trip-controls__navigation');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(tripMainElement, new TripInfoView(tripEvents).element, RenderPosition.AFTERBEGIN);
render(menuElement, new TabsView().element);
render(filterElement, new FilterView().element);
render(tripEventsElement, new SortView().element);
render(tripMainElement, new NewEventButtonView().element);
render(tripEventsElement, new TripEventsListView().element);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

render(tripEventsListElement, new TripEventEditorView(tripEvents[0]).element);

for (let i = 1; i < TRIP_EVENTS_COUNT; i++) {
  render(tripEventsListElement, new TripEventView(tripEvents[i]).element);
}
