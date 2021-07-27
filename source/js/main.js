import { getData } from './api/api.js';
import { filterPins } from './filter.js';
import { changePageState, childeFilter, mapFilters } from './form.js';
import { getMarkers, showPins } from './map.js';
import { errorGetData, openModal } from './user-modal.js';

getData(
  (data) => {
    const markers = getMarkers(data);
    showPins(markers);
    filterPins(data, markers);
  },
  () => {
    openModal(errorGetData);
    changePageState(childeFilter, mapFilters, true);
  },
);
