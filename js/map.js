import { form, addressInput, mapFilters } from './form.js';
import { createOffer, getSimpleStructure } from './create-card.js';
import { MAX_COUNT_OF_DECIMAL_NUMBERS, MAIN_PIN, PIN, START_POINTS, START_POINTS_OBJECT, TOKYO_LATITUDE, TOKYO_LONGITUDE } from './constant.js';
const L = window.L;
const nodes = [...mapFilters.children, ...form.children];
const ZOOM = 13;

const changeNodesStates = (node, condition) => {
  node.forEach(element => {
    element.disabled = condition;
  });

  if (condition) {
    form.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  }
  else {
    form.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  }
}

changeNodesStates(nodes, true);

const map = L.map('map-canvas')
  .on('load', () => {
    changeNodesStates(nodes, false);
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

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (e) => {
  const coordinates = e.target.getLatLng();
  addressInput.value = `${coordinates.lat.toFixed(MAX_COUNT_OF_DECIMAL_NUMBERS)}, ${coordinates.lng.toFixed(MAX_COUNT_OF_DECIMAL_NUMBERS)}`;
});

const refreshMap = () => {
  map.setView(START_POINTS_OBJECT, ZOOM);
  const startLatLng = new L.LatLng(TOKYO_LATITUDE, TOKYO_LONGITUDE);
  mainPinMarker.setLatLng(startLatLng);
}

const getPins = (pins) => {
  let points = pins.map(item => {
    return getSimpleStructure(item);
  });

  points.forEach((point) => {
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [PIN, PIN],
      iconAnchor: [PIN / 2, PIN],
    });

    const marker = L.marker(
      {
        lat: point.lat,
        lng: point.lng,
      },
      {
        icon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(
        createOffer(point),
        {
          keepInView: true,
        },
      );
  });
}

export { getPins, refreshMap };
