import TripInfoView from './view/trip-info-view.js';
import TripEventView from './view/trip-event-view.js';
import TripEventEditorView from './view/trip-event-editor-view.js';
import TabsView from './view/tabs-view.js';
import FilterView from './view/filter-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripEventListView from './view/trip-event-list-view.js';
import SortView from './view/sort-view.js';
import { RenderPosition, render } from './utils/utils.js';
import { getTripEvent } from './mock/event.js';

const TRIP_EVENTS_COUNT = 18;

const tripEvents = Array.from({length: TRIP_EVENTS_COUNT}, getTripEvent);

const tripMainElement = document.querySelector('.trip-main');
const menuElement = tripMainElement.querySelector('.trip-controls__navigation');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const renderTripEvent = (eventListElement, tripEvent) => {
  const tripEventComponent = new TripEventView(tripEvent);
  const tripEventEditComponent = new TripEventEditorView(tripEvent);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(tripEventEditComponent.element, tripEventComponent.element);
  };

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(tripEventComponent.element, tripEventEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripEventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  tripEventEditComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, tripEventComponent.element);
};

render(tripMainElement, new TripInfoView(tripEvents).element, RenderPosition.AFTERBEGIN);
render(menuElement, new TabsView().element);
render(filterElement, new FilterView().element);
render(tripEventsElement, new SortView().element);
render(tripMainElement, new NewEventButtonView().element);

// render(tripEventsListElement, new TripEventEditorView(tripEvents[0]).element);
const tripEventListComponent = new TripEventListView();

render(tripEventsElement, tripEventListComponent.element);

for (let i = 0; i < TRIP_EVENTS_COUNT; i++) {
  renderTripEvent(tripEventListComponent.element, tripEvents[i]);
}
