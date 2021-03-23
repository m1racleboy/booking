import { showPins, getStructuredOffers, getMarkers } from './map.js';
import { getData } from './api.js';
import { filterPins } from './filter.js';

getData((offers) => {
  const structuredOffers = getStructuredOffers(offers);
  const markers = getMarkers(structuredOffers);
  showPins(markers);
  filterPins(structuredOffers, markers)
});
