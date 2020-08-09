<template>
  <div class="container__page">
    <h1>home</h1>
    <BarChart v-if="loaded" :labels="dateLabels" />
  </div>
</template>

<script>
import axios from 'axios';
import API from '@/constants/covidAPI.js';
import BarChart from '@/components/BarChart';

export default {
  components: {
    BarChart
  },

  data() {
    return {
      casesByDay: null,
      dateLabels: null,
      deathsByDay: null,
      loaded: false,
      totalCases: null,
      totalDeaths: null
    };
  },

  mounted() {
    this.loaded = false;

    axios
      .get(API.USHISTORIC)
      .then(response => {
        this.casesByDay = this.setChartData(response.data).casesByDay;
        this.dateLabels = this.setChartData(response.data).dateLabels;
        this.deathsByDay = this.setChartData(response.data).deathsByDay;
        // console.log(31, this.setChartData(response.data));
        this.loaded = true;
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    readableDate(dateString) {
      const dateObj = new Date(dateString);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();

      return `${month}/${day}/${year}`;
    },
    /*
      For Bar chart:
      1. Reverse the array to start at oldest date
      2. Get dates and set to labels
        -       // check to make sure date exists, if not return and skip
        - make date readable
        - put in array
        - return array
        - set array to labels prop
        - need to do this only once for each deaths and total cases
      3. Get and set deaths in bar chart
      4. Get and set total cases in bar chart
    */
    setChartData(data) {
      const reversedByDate = data.reverse();
      console.log(reversedByDate);
      const chartsData = {
        casesByDay: [],
        dateLabels: [],
        deathsByDay: []
      };

      reversedByDate.forEach(item => {
        const totalCases = item.total ? item.total : 0;
        const totalDeaths = item.total ? item.death : 0;
        const date = this.readableDate(item.dateChecked);

        chartsData.casesByDay.push(totalCases);
        chartsData.dateLabels.push(date);
        chartsData.deathsByDay.push(totalDeaths);
      });

      console.log(81, chartsData);
      return chartsData;
    }
  }
};
</script>

<style lang="scss" scoped></style>
