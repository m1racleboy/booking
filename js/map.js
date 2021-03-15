import { form, addressInput } from './form.js';
import { createOffer, getSimpleStructure } from './create-card.js';
import { MAX_COUNT_OF_DECIMAL_NUMBERS } from './constant.js';
const L = window.L;
const TOKYO_LATITUDE = 35.6895;
const TOKYO_LONGITUDE = 139.69171;
const MAIN_PIN = 52;
const PIN = 40;

const mapFilters = document.querySelector('.map__filters');
const nodes = [...mapFilters.children, ...form.children];

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
    addressInput.value = `${TOKYO_LATITUDE}, ${TOKYO_LONGITUDE}`;
  })
  .setView({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  }, 13);

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
  {
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  },
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

const getPins = (pins) => {
  let points = pins.map(item => {
    return getSimpleStructure(item);
  });

  points.forEach((point) => {
    console.log(point);
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

export { getPins };
