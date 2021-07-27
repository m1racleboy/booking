import { debounce } from './utils/debounce.js';
import { PRICES, DEBOUNCE_DELAY } from './const.js';
import { mapFilters } from './form.js';
import { getMarkers, hidePins, showPins } from './map.js';

export const filterPins = (offers, markers) => {
  const getFilterParam = (evt) => {
    const target = evt.target;
    return {
      param: target.name.replace(/housing-/, ''),
      value: target.value,
    };
  };

  const filterByType = (array, param, value) => value === 'any' ? array : array.filter((offer) => offer[param] === value);

  const filterByCapacity = (array, param, value) => value === 'any' ? array : array.filter((offer) => offer[param] === +value);

  const filterByPrice = (array, param, value) => value === 'any' ? array : array.filter((offer) => {
    switch (value) {
      case 'low':
        return +offer[param] < PRICES.low;
      case 'high':
        return +offer[param] > PRICES.high;
      case 'middle':
        return +offer[param] <= PRICES.high && +offer[param] >= PRICES.low;
      default:
        break;
    }
  });

  const filterByCheckboxes = (array, param) => {
    const features = [...mapFilters.querySelectorAll('input[type="checkbox"]:checked')];
    const featuresValues = features.map((feature) => feature.value);

    if (features.length === 0) {
      return array;
    }

    return array.filter((offer) => offer[param].some((feature) => featuresValues.some((value) => value === feature)));
  };

  const Filters = {
    result: [],
    byType(value) {
      this.result = filterByType(this.result, 'type', value);
      return this;
    },
    byPrice(value) {
      this.result = filterByPrice(this.result, 'price', value);
      return this;
    },
    byRooms(value) {
      this.result = filterByCapacity(this.result, 'rooms', value);
      return this;
    },
    byGuests(value) {
      this.result = filterByCapacity(this.result, 'guests', value);
      return this;
    },
    byFeatures() {
      this.result = filterByCheckboxes(this.result, 'features');
      return this;
    },
  };


  const createFilterChangeHandler = () => {
    let filteredMarkers = [...markers];
    const filterValues = {
      type: 'any',
      price: 'any',
      rooms: 'any',
      guests: 'any',
    };

    return (evt) => {
      const { param, value } = getFilterParam(evt);
      hidePins(filteredMarkers);

      Filters.result = [...offers];
      filterValues[param] = value;
      Filters
        .byType(filterValues.type)
        .byPrice(filterValues.price)
        .byRooms(filterValues.rooms)
        .byGuests(filterValues.guests)
        .byFeatures();

      filteredMarkers = getMarkers(Filters.result);
      showPins(filteredMarkers);
    };
  };

  mapFilters.addEventListener('change', debounce(createFilterChangeHandler(), DEBOUNCE_DELAY), true);
};
