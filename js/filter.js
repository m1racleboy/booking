/* global _:readonly */
import { FEATURES_COUNT, PRICES, RERENDER_DELAY } from './constant.js';
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

  const createFilterByCheckboxes = () => {
    let features = [];

    return (array, target) => {
      const value = target.value;
      target.checked ? features.push(value) : features.splice(features.findIndex(item => item === value), 1);
      const featuresLength = features.length;

      return array.filter(item => {
        const itemFeaturesLength = item.features.length;
        if (featuresLength > itemFeaturesLength) {
          return false;
        }

        if (itemFeaturesLength === FEATURES_COUNT) {
          return true;
        }

        if (featuresLength === 0) {
          return true;
        }

        return (new Set([...features, ...item.features])).size === itemFeaturesLength;
      })
    }
  }

  const filterByCheckboxes = createFilterByCheckboxes();

  const Filters = {
    result: [],
    byType(value) {
      this.result = filterByOptions(this.result, 'type', value);
      return this;
    },
    byPrice(value) {
      this.result = filterByPrice(this.result, 'price', value);
      return this;
    },
    byRooms(value) {
      this.result = filterByOptions(this.result, 'rooms', value);
      return this;
    },
    byGuests(value) {
      this.result = filterByOptions(this.result, 'guests', value);
      return this;
    },
    byFeatures(target) {
      this.result = filterByCheckboxes(this.result, target);
      return this;
    },
  }


  const createFilterChangeHandler = () => {
    let filteredMarkers = [...markers];
    const filterValues = {
      type: 'any',
      price: 'any',
      rooms: 'any',
      guests: 'any',
    }

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
        .byFeatures(evt.target)

      filteredMarkers = getMarkers(Filters.result);
      showPins(filteredMarkers);
    }
  }

  mapFilters.addEventListener('change', _.debounce(createFilterChangeHandler(), RERENDER_DELAY), true);
}
