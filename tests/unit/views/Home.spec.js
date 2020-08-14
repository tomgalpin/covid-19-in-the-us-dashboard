import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import axios from 'axios';
import Home from '@/views/Home.vue';
import API from '@/constants/covidAPI.js';

const localVue = createLocalVue();

localVue.use(Vuex);
jest.mock(
  'axios',
  () => ({
    get: jest.fn(),
    all: jest.fn(),
    spread: jest.fn()
  }),
  {
    virtual: true
  }
);

const mockData = {
  daily: [
    {
      date: 20200813,
      deathIncrease: 1163,
      positiveIncrease: 51705
    },
    {
      date: 20200812,
      deathIncrease: 1503,
      positiveIncrease: 56035
    },
    {
      date: 20200811,
      deathIncrease: 1326,
      positiveIncrease: 55594
    }
  ],
  totals: {
    date: 20200813,
    positive: 5224214,
    death: 158939
  }
};

describe('Home.vue => Country', () => {
  let wrapper;
  const dateString = '20200812';
  const results = [];
  const mockAxiosSpreadResult = jest.fn();
  const $route = {
    fullPath: '/',
    params: {}
  };

  beforeEach(() => {
    const store = new Vuex.Store();
    store.commit = jest.fn();

    axios.get.mockClear();
    axios.all.mockResolvedValue(results);
    axios.spread.mockReturnValue(mockAxiosSpreadResult);

    wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $route
      }
    });
  });

  it('should call axios.get once for each url', () => {
    expect(axios.get).toHaveBeenCalledWith(API.US_DAILY);
    expect(axios.get).toHaveBeenCalledWith(API.US_TOTALS);
  });

  it('should call axios.spread with a callback', () => {
    expect(axios.spread).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should call the result of axios.spread with the resolved value of axios.all', () => {
    expect(mockAxiosSpreadResult).toHaveBeenCalledWith(results);
  });

  it('checks if it is U.S. State & sets data attributes', () => {
    wrapper.vm.checkIsState();
    expect(wrapper.vm.isState).toBe(false);
    expect(wrapper.vm.stateID).toBe(null);
  });

  it('formats an 8-digit String into a readable date', () => {
    const readableDate = wrapper.vm.formattedDate(dateString);

    expect(readableDate).toEqual('Sep 12, 2020');
  });

  it('sets the API data into data attributes', () => {
    wrapper.vm.setAPIData(mockData.daily, mockData.totals);

    expect(wrapper.vm.casesByDay).toEqual([55594, 56035, 51705]);
    expect(wrapper.vm.dateLabels).toEqual([
      'Sep 11, 2020',
      'Sep 12, 2020',
      'Sep 13, 2020'
    ]);
    expect(wrapper.vm.deathsByDay).toEqual([1326, 1503, 1163]);
    expect(wrapper.vm.totalCases).toEqual('5,224,214');
    expect(wrapper.vm.totalDeaths).toEqual('158,939');
  });

  it('parses the data for the charts', () => {
    const result = wrapper.vm.setChartData(mockData.daily);
    const mockResults = {
      casesByDay: [51705, 56035, 55594],
      dateLabels: ['Sep 13, 2020', 'Sep 12, 2020', 'Sep 11, 2020'],
      deathsByDay: [1163, 1503, 1326]
    };

    expect(result).toEqual(mockResults);
  });

  it('correctly sets page title', () => {
    wrapper.vm.checkIsState();
    wrapper.vm.setTitle();

    expect(wrapper.vm.title).toEqual('Covid-19 Cases in the U.S.');
  });
});

describe('Home.vue => State', () => {
  let wrapper;
  const $route = {
    fullPath: '/',
    params: {
      id: 'AL'
    }
  };

  beforeEach(() => {
    const store = new Vuex.Store();
    store.commit = jest.fn();

    wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $route
      }
    });
  });

  it('checks if it is U.S. State & sets data attributes', () => {
    wrapper.vm.checkIsState();
    expect(wrapper.vm.isState).toBe(true);
    expect(wrapper.vm.stateID).toBe('AL');
  });

  it('checks if it is U.S. State & commits a Vuex mutation', () => {
    wrapper.vm.checkIsState();
    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(
      'setStatesDropdown',
      true
    );
  });

  it('correctly sets page title', () => {
    wrapper.vm.checkIsState();
    wrapper.vm.setTitle();

    expect(wrapper.vm.title).toEqual('Covid-19 Cases in Alabama');
  });
});
