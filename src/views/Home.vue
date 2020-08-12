<template>
  <div class="container__page">
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
</template>

<script>
import axios from 'axios';
import API from '@/constants/covidAPI.js';
import { STATE_CODES } from '@/constants/stateCodes.js';

import BarChart from '@/components/BarChart';
import TotalsBox from '@/components/TotalsBox';

export default {
  components: {
    BarChart,
    TotalsBox
  },

  data() {
    return {
      isState: false,
      stateID: null,
      apiRegion: null,
      loaded: false,
      title: null,

      chartHeight: 300,
      casesByDay: null,
      dateLabels: null,
      deathsByDay: null,
      totalCases: null,
      totalDeaths: null,

      dailyVals: null,
      totalVals: null,

      routeData: {
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
      }
    };
  },

  watch: {
    $route(to, from) {
      this.setContentByRoute();
    }
  },

  async mounted() {
    this.setContentByRoute();
  },

  methods: {
    async getAPIs(dailyAPI, totalsAPI, isState) {
      return await axios
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
        .catch(errors => {
          console.log(errors);
        });
    },

    async setContentByRoute() {
      this.checkIsState();
      this.setTitle();

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

      this.loaded = false;

      const response = await this.getAPIs(
        apis[this.apiRegion].daily,
        apis[this.apiRegion].totals,
        this.isState
      );

      this.setAPIData(response.dailyVals, response.totalVals);

      this.loaded = true;
    },

    checkIsState() {
      this.isState = !!this.$route.params.id;
      this.stateID = this.isState ? this.$route.params.id : null;
      this.apiRegion = this.isState ? 'state' : 'us';
    },

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

      console.log(date.getMonth());

      return dateFormatter.format(date);
    },

    setAPIData(dailyVals, totalVals) {
      this.casesByDay = this.setChartData(dailyVals).casesByDay;
      this.dateLabels = this.setChartData(dailyVals).dateLabels.reverse();
      this.deathsByDay = this.setChartData(dailyVals).deathsByDay;
      this.totalCases = totalVals.positive.toLocaleString();
      this.totalDeaths = totalVals.death.toLocaleString();
    },

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

    setTitle() {
      const titleBase = 'Covid-19 Cases in';
      const titleEnd = this.isState
        ? `${STATE_CODES[this.stateID].text}`
        : 'U.S.';

      this.title = `${titleBase} ${titleEnd} `;
    }
  }
};
</script>

<style lang="scss" scoped>
.container__chart {
  position: relative;

  &.cases {
    margin-bottom: 2rem;
  }
}

.container__title {
  margin-bottom: 2.5rem;
}
</style>
