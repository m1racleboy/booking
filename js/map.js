import { form, addressInput } from './form.js';
import { similarCards } from './create-card.js';
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

mainPinMarker.on('moveend', (evt) => {
  addressInput.value = evt.target.getLatLng();
});

const createCustomPopup = ({ lat, lng, title }) => `<section class="balloon">
    <h3 class="balloon__title">${title}</h3>
    <p class="balloon__lat-lng">Координаты: ${lat}, ${lng}</p>
  </section>`;

const getPins = (pins) => {
  let points = pins.map(item => {
    return {
      title: item.offer.title,
      lat: item.location.lat,
      lng: item.location.lng,
    }
  });

  points.forEach((point) => {
    const { lat, lng } = point;

    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [PIN, PIN],
      iconAnchor: [PIN / 2, PIN],
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        createCustomPopup(point),
        {
          keepInView: true,
        },
      );
  });
}

getPins(similarCards);
