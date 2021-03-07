import { form } from './form.js';
import { similarCards } from './create-card.js';
const L = window.L;

const mapFilters = document.querySelector('.map__filters');
form.classList.add('ad-form--disabled');
mapFilters.classList.add('map__filters--disabled');

const mapNodes = Array.from(mapFilters.children);
const formNodes = Array.from(form.children);

mapNodes.forEach(element => {
  element.disabled = true;
});

formNodes.forEach(element => {
  element.disabled = true;
});



const map = L.map('map-canvas')
  .on('load', () => {
    form.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');

    mapNodes.forEach(element => {
      element.disabled = false;
    });

    formNodes.forEach(element => {
      element.disabled = false;
    });
  })
  .setView({
    lat: 35.6895,
    lng: 139.69171,
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

const createCustomPopup = ({ lat, lng, title }) => `<section class="balloon">
  <h3 class="balloon__title">${title}</h3>
  <p class="balloon__lat-lng">Координаты: ${lat}, ${lng}</p>
</section>`;

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
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
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
