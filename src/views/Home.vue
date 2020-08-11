<template>
  <div class="container__page">
    <div class="container__title">
      <h1>Covid-19 in the U.S.</h1>
    </div>
    <div v-if="loaded" class="container__chart cases">
      <TotalsBox :num="totalCases" :totalsMeta="casesTotalMeta" />
      <BarChart
        :labels="dateLabels"
        :data="this.casesByDay"
        :meta="this.dailyCasesMeta"
      />
    </div>
    <div v-if="loaded" class="container__chart deaths">
      <TotalsBox :num="totalDeaths" :totalsMeta="deathsTotalMeta" />
      <BarChart
        :labels="dateLabels"
        :data="this.deathsByDay"
        :meta="this.dailyDeathsMeta"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import API from '@/constants/covidAPI.js';
import BarChart from '@/components/BarChart';
import TotalsBox from '@/components/TotalsBox';

export default {
  components: {
    BarChart,
    TotalsBox
  },

  data() {
    return {
      loaded: false,
      casesByDay: null,
      dateLabels: null,
      deathsByDay: null,
      totalCases: null,
      totalDeaths: null,
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
  },

  async mounted() {
    this.loaded = false;

    try {
      const usHistoric = await axios.get(API.USHISTORIC);
      const usTotals = await axios.get(API.USTOTALS);

      console.log(usTotals);

      this.casesByDay = this.setChartData(usHistoric.data).casesByDay;
      this.dateLabels = this.setChartData(usHistoric.data).dateLabels.reverse();
      this.deathsByDay = this.setChartData(usHistoric.data).deathsByDay;

      this.totalCases = usTotals.data[0].positive.toLocaleString();
      this.totalDeaths = usTotals.data[0].death.toLocaleString();

      this.loaded = true;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    /*
     *  Adapted from: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
     */
    formattedDate(dateString) {
      const dateFormatter = new Intl.DateTimeFormat('en', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      const date = new Date(dateString);
      const [
        { value: month },
        ,
        { value: day },
        ,
        { value: year }
      ] = dateFormatter.formatToParts(date);

      return {
        day,
        month,
        year
      };
    },

    setChartData(data) {
      const chartsData = {
        casesByDay: [],
        dateLabels: [],
        deathsByDay: []
      };

      data.reverse().forEach(item => {
        const cases = item.positiveIncrease;
        const date = this.formattedDate(item.dateChecked);
        const deaths = item.deathIncrease;

        chartsData.casesByDay.push(cases);
        chartsData.dateLabels.push(date);
        chartsData.deathsByDay.push(deaths);
      });

      return chartsData;
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
