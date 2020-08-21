<template>
  <div class="container__page">
    <Map />
    <div v-if="!loaded">
      <Loading />
    </div>
    <div v-else>
      <div class="container__title">
        <h1>{{ title }}</h1>
      </div>
      <div v-if="loaded" class="container__chart cases">
        <TotalsBox :num="totalCases" :totalsMeta="routeData.casesTotalMeta" />
        <BarChart
          :labels="dateLabels"
          :data="casesByDay"
          :meta="routeData.dailyCasesMeta"
          :height="chartHeight"
        />
      </div>
      <div v-if="loaded" class="container__chart deaths">
        <TotalsBox :num="totalDeaths" :totalsMeta="routeData.deathsTotalMeta" />
        <BarChart
          :labels="dateLabels"
          :data="deathsByDay"
          :meta="routeData.dailyDeathsMeta"
          :height="chartHeight"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import API from '@/constants/covidAPI.js';
import { STATE_CODES } from '@/constants/stateCodes.js';

import BarChart from '@/components/BarChart';
import Loading from '@/components/Loading';
import Map from '@/components/Map';
import TotalsBox from '@/components/TotalsBox';

export default {
  components: {
    BarChart,
    Loading,
    Map,
    TotalsBox
  },

  data() {
    return {
      isState: false,
      stateID: null,
      loaded: false,
      title: null,
      chartHeight: 300,
      casesByDay: null,
      dateLabels: null,
      deathsByDay: null,
      totalCases: null,
      totalDeaths: null,
      dailyVals: null,
      totalVals: null
    };
  },

  computed: {
    routeData() {
      return {
        dailyCasesMeta: {
          backgroundColor: '#afadad',
          hoverBackgroundColor: '#0596d8',
          tooltipText: 'Cases Confirmed:'
        },
        dailyDeathsMeta: {
          backgroundColor: '#afadad',
          hoverBackgroundColor: '#dd4b3a',
          tooltipText: 'Deaths Confirmed:'
        },
        casesTotalMeta: {
          icon: 'fa-users',
          iconBG: '#3c8dbc',
          text: 'Confirmed Cases'
        },
        deathsTotalMeta: {
          icon: 'fa-frown-o',
          iconBG: '#dd4b3a',
          text: 'Confirmed Deaths'
        }
      };
    }
  },

  watch: {
    $route(to, from) {
      this.setContentByRoute();
    }
  },

  mounted() {
    this.setContentByRoute();
  },

  methods: {
    /**
     * Parent function that sets data attributes and calls API's
     * based on if route is a State or US/Country.
     * @return {String}
     */
    async setContentByRoute() {
      let response;

      this.loaded = false;
      this.checkIsState();

      const apis = {
        state: {
          daily: `${API.STATE_BASE}${this.stateID}/daily.json`,
          totals: `${API.STATE_BASE}${this.stateID}/current.json`
        },
        us: {
          daily: API.US_DAILY,
          totals: API.US_TOTALS
        }
      };
      const apiRegion = this.isState ? 'state' : 'us';

      try {
        response = await this.getAPIs(
          apis[apiRegion].daily,
          apis[apiRegion].totals,
          this.isState
        );
      } catch (error) {
        this.$router.push({ name: 'Error' });
      }

      if (response) {
        this.setAPIData(response.dailyVals, response.totalVals);
        this.setTitle();
        this.loaded = true;
      }
    },

    /**
     * Checks if route has a state id and sets
     * attributes based on $route.params:
     * 'isState', 'stateID'.
     * Sets commits $store 'setStatesDropdown' to true,
     * in case of a deeplink and/or refresh of a US States page.
     */
    checkIsState() {
      this.isState = !!this.$route.params.id;
      this.stateID = this.isState ? this.$route.params.id : null;

      if (this.isState) this.$store.commit('setStatesDropdown', true);
    },

    /**
     * Formats an 8-digit date into a readable date.
     * @param {String} dateString
     * @return {String}
     */
    formattedDate(dateString) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      const date = new Date(year, month, day);
      const dateFormatter = new Intl.DateTimeFormat('en', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      return dateFormatter.format(date);
    },

    /**
     * Gets API's for Barcharts and Totalsboxes
     * @param {String} dailyAPI
     * @param {String} totalsAPI
     * @param {Boolean} isState
     * @return {Object}
     */
    getAPIs(dailyAPI, totalsAPI, isState) {
      return axios
        .all([axios.get(dailyAPI), axios.get(totalsAPI)])
        .then(
          axios
            .spread((...responses) => {
              const dailyVals = responses[0].data;
              const totalVals = isState
                ? responses[1].data
                : responses[1].data[0];

              return {
                dailyVals,
                totalVals
              };
            })
            .bind(this)
        )
        .catch(error => {
          throw error;
          return { error: true };
        });
    },

    /**
     * Sets data attributes:
     * 'casesByDay', 'dateLabels', 'deathsByDay', 'totalCases', 'totalDeaths'.
     * @param {Array} dailyVals
     * @param {Object} totalVals
     */
    setAPIData(dailyVals, totalVals) {
      this.casesByDay = this.setChartData(dailyVals).casesByDay;
      this.dateLabels = this.setChartData(dailyVals).dateLabels.reverse();
      this.deathsByDay = this.setChartData(dailyVals).deathsByDay;
      this.totalCases = totalVals.positive.toLocaleString();
      this.totalDeaths = totalVals.death.toLocaleString();
    },

    /**
     * Parses data to be sent to BarChart
     * @param {Array} data
     * @return {Object}
     */
    setChartData(data) {
      const chartsData = {
        casesByDay: [],
        dateLabels: [],
        deathsByDay: []
      };

      data.reverse().forEach(item => {
        // Account for negative cases and/or deaths from data:
        const cases = item.positiveIncrease >= 0 ? item.positiveIncrease : 0;
        const date = this.formattedDate(item.date.toString());
        const deaths = item.deathIncrease >= 0 ? item.deathIncrease : 0;

        chartsData.casesByDay.push(cases);
        chartsData.dateLabels.push(date);
        chartsData.deathsByDay.push(deaths);
      });

      return chartsData;
    },

    /**
     * Sets data attributes 'title'.
     * @param {Array} data
     */
    setTitle() {
      const titleBase = 'Covid-19 Cases in';
      const titleEnd = this.isState
        ? `${STATE_CODES[this.stateID].text}`
        : 'the U.S.';

      this.title = `${titleBase} ${titleEnd}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.container__title {
  margin-bottom: 2.5rem;
}

.container__chart {
  position: relative;

  &.cases {
    margin-bottom: 2rem;
  }
}

::v-deep .container__totals {
  width: 25rem;
  margin-bottom: 1.5rem;
}
</style>
