import { showPins, getStructuredOffers, getMarkers } from './map.js';
import { childeFilter, changePageState, mapFilters } from './form.js';
import { getData } from './api.js';
import { filterPins } from './filter.js';
import { errorGetData, openModal } from './user-modal.js';

getData(
  (offers) => {
    const structuredOffers = getStructuredOffers(offers);
    const markers = getMarkers(structuredOffers);
    showPins(markers);
    filterPins(structuredOffers, markers);
  },
  () => {
    openModal(errorGetData);
    changePageState(childeFilter, mapFilters, true);
  },
);
