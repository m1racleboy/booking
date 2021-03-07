import { form } from './form.js';
import { similarCards } from './create-card.js';
const L = window.L;
const TOKYO_LATITUDE = 35.6895;
const TOKYO_LONGITUDE = 139.69171;
const MAIN_PIN = 52;
const PIN = 40;
// Я пока с массивом points, объединением в функции и динамической генерацией размеров пинов повременю,
// по памяти кривовато получилось сделать, оставлю это на после защитное время), в некст дз коммент удалю, если этот смержишь
const mapFilters = document.querySelector('.map__filters');
const nodes = [...mapFilters.children, ...form.children];
form.classList.add('ad-form--disabled');
mapFilters.classList.add('map__filters--disabled');

const changeNodeStates = (node, condition) => {
  node.forEach(element => {
    element.disabled = condition;
  });
}

changeNodeStates(nodes, true);

const map = L.map('map-canvas')
  .on('load', () => {
    form.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');

    changeNodeStates(nodes, false);
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

const points = [];
similarCards.forEach((item, i) => {
  points[i] = {
    title: item.offer.title,
    lat: item.location.lat,
    lng: item.location.lng,
  }
});


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

// mainPinMarker.on('moveend', (evt) => {
//   console.log(evt.target.getLatLng());
// });

points.forEach((point) => {
  const { lat, lng } = point;

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [PIN, PIN],
    iconAnchor: [PIN / 2, PIN],
  });

  const createCustomPopup = ({ lat, lng, title }) => `<section class="balloon">
    <h3 class="balloon__title">${title}</h3>
    <p class="balloon__lat-lng">Координаты: ${lat}, ${lng}</p>
  </section>`;

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
