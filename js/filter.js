/* global _:readonly */
import { PRICES, RERENDER_DELAY } from './constant.js';
import { mapFilters } from './form.js';
import { getMarkers, hidePins, showPins } from './map.js';

export const filterPins = (offers, markers) => {
  const getFilterParam = (evt) => {
    const target = evt.target;
    return {
      param: target.name.replace(/housing-/, ''),
      value: target.value,
    }
  };

  const filterByOptions = (array, param, value) => value === 'any' ? array : array.filter(offer => offer[param] === value);
  const filterByPrice = (array, param, value) => value === 'any' ? array : array.filter(offer => {
    switch (value) {
      case 'low':
        return +offer[param] < PRICES.low;
      case 'high':
        return +offer[param] > PRICES.high;
      case 'middle':
        return +offer[param] <= PRICES.high && +offer[param] >= PRICES.low;
      default:
        return;
    }
  });

  const filterByCheckboxes = (array, param) => {
    const features = [...mapFilters.querySelectorAll('input[type="checkbox"]:checked')];
    const featuresValues = features.map(feature => feature.value);
    return array.filter(offer => JSON.stringify(featuresValues) === JSON.stringify(offer[param]));
  }

  const Filters = {
    result: [],
    filterByType(value) {
      this.result = filterByOptions(this.result, 'type', value);
      return this;
    },
    filterByPrice(value) {
      this.result = filterByPrice(this.result, 'price', value);
      return this;
    },
    filterByRooms(value) {
      this.result = filterByOptions(this.result, 'rooms', value);
      return this;
    },
    filterByGuests(value) {
      this.result = filterByOptions(this.result, 'guests', value);
      return this;
    },
    filterByFeatures() {
      this.result = filterByCheckboxes(this.result, 'features');
      return this;
    },
  }

  const filterValues = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
  }

  const createFilterChangeHandler = () => {
    let filteredMarkers = [...markers];

    return (evt) => {
      const { param, value } = getFilterParam(evt);
      hidePins(filteredMarkers);

      Filters.result = [...offers];
      filterValues[param] = value;
      Filters
        .filterByType(filterValues.type)
        .filterByPrice(filterValues.price)
        .filterByRooms(filterValues.rooms)
        .filterByGuests(filterValues.guests)
        .filterByFeatures()

      filteredMarkers = getMarkers(Filters.result);
      showPins(filteredMarkers);
    }
  }

  mapFilters.addEventListener('change', _.debounce(createFilterChangeHandler(), RERENDER_DELAY))
}
