import { getData } from './api/api.js';
import { changePageState, addressInput, childeFilter, childeForm, form, mapFilters } from './form.js';
import { MAX_DECIMAL_NUMBERS, MAIN_PIN, PIN, START_POINTS, START_POINTS_OBJECT, ZOOM, HALF_VALUE_OF_PIN, TOKYO_LATITUDE, TOKYO_LONGITUDE, COUNT_OF_PINS } from './const.js';
import { createCardTemplate } from './card.js';
import { filterPins } from './filter.js';
import { errorGetData, openModal } from './user-modal.js';

changePageState(childeForm, form, true);
changePageState(childeFilter, mapFilters, true);

const map = L.map('map-canvas')
  .on('load', () => {
    changePageState(childeForm, form, false);
    changePageState(childeFilter, mapFilters, false);
    addressInput.value = START_POINTS;
  })
  .setView(START_POINTS_OBJECT, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN, MAIN_PIN],
  iconAnchor: [MAIN_PIN / HALF_VALUE_OF_PIN, MAIN_PIN],
});

const mainPinMarker = L.marker(
  START_POINTS_OBJECT,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [PIN, PIN],
  iconAnchor: [PIN / HALF_VALUE_OF_PIN, PIN],
});

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressInput.value = `${coordinates.lat.toFixed(MAX_DECIMAL_NUMBERS)}, ${coordinates.lng.toFixed(MAX_DECIMAL_NUMBERS)}`;
});

export const getMarkers = (pins) => pins
  .map((pin) => L.marker(
    {
      lat: pin.lat,
      lng: pin.lng,
    },
    {
      icon: icon,
    },
  ).bindPopup(
    createCardTemplate(pin),
    {
      keepInView: true,
    },
  ));

export const showPins = (markers) => markers.slice(0, COUNT_OF_PINS).forEach((marker) => marker.addTo(map));

export const hidePins = (markers) => markers.forEach((marker) => marker.remove());

export const refreshMap = () => {
  map.setView(START_POINTS_OBJECT, ZOOM);
  const startLatLng = new L.LatLng(TOKYO_LATITUDE, TOKYO_LONGITUDE);
  mainPinMarker.setLatLng(startLatLng);

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
};
