/* global L:readonly */
import { addressInput, childeNodes, changeFormsStates } from './form.js';
import { createOffer, getSimpleStructure } from './create-card.js';
import {
  MAX_DECIMAL_NUMBERS, MAIN_PIN, PIN, START_POINTS, START_POINTS_OBJECT,
  TOKYO_LATITUDE, TOKYO_LONGITUDE, ZOOM, COUNT_OF_PINS
} from './constant.js';

changeFormsStates(childeNodes, true);

const map = L.map('map-canvas')
  .on('load', () => {
    changeFormsStates(childeNodes, false);
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
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN, MAIN_PIN],
  iconAnchor: [MAIN_PIN / 2, MAIN_PIN],
});

const mainPinMarker = L.marker(
  START_POINTS_OBJECT,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const icon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [PIN, PIN],
  iconAnchor: [PIN / 2, PIN],
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (e) => {
  const coordinates = e.target.getLatLng();
  addressInput.value = `${coordinates.lat.toFixed(MAX_DECIMAL_NUMBERS)}, ${coordinates.lng.toFixed(MAX_DECIMAL_NUMBERS)}`;
});

export const refreshMap = () => {
  map.setView(START_POINTS_OBJECT, ZOOM);
  const startLatLng = new L.LatLng(TOKYO_LATITUDE, TOKYO_LONGITUDE);
  mainPinMarker.setLatLng(startLatLng);
}

export const getStructuredOffers = offers => offers.map(item => getSimpleStructure(item));

export const getMarkers = (pins) => {
  const markers = pins.slice(0, COUNT_OF_PINS).map(pin => L.marker(
    {
      lat: pin.lat,
      lng: pin.lng,
    },
    {
      icon,
    },
  ).bindPopup(
    createOffer(pin),
    {
      keepInView: true,
    },
  ))
  return markers;
}

export const showPins = (markers) => markers.forEach(marker => marker.addTo(map));

export const hidePins = (markers) => markers.forEach(marker => marker.remove());
