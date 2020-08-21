<template>
  <div class="container__map">
    <svg ref="svg" width="100%" height="100%">
      <path
        v-for="state in stateData"
        :key="state.feature.id"
        :d="pathGenerator(state.feature)"
        :style="{
          fill: '#3c8dbc',
          stroke: '#000'
        }"
        @mouseover="showStateData(state)"
        @click="clickStateData(state)"
      />
    </svg>
  </div>
</template>

<script>
// import stateGeoData from '@/constants/stateGeoData.json';
import axios from 'axios';
import * as d3 from 'd3';

export default {
  data() {
    return {
      statesGeoData: null,
      height: 600,
      width: 1200
    };
  },

  computed: {
    // Typical projection for showing all states scaled and positioned appropriately
    projection() {
      return d3
        .geoAlbersUsa()
        .translate([this.width / 2, this.height / 2]) // translate to center of screen
        .scale([1000]); // scale things down so see entire US;
    },

    // Function for converting GPS coordinates into path coordinates
    pathGenerator() {
      return d3.geoPath().projection(this.projection);
    },

    // Combine the states GeoJSON with a rank-based gradient
    stateData() {
      return this.statesGeoData
        ? this.statesGeoData.features.map(feature => {
            // let state = this.happiestStates.find(
            //   state => state.state === feature.id
            // );
            return {
              feature
              // color: '#9a9898'
            };
          })
        : [];
    }
  },

  created() {
    axios
      .get('https://api.github.com/gists/e0d1b7950ced31369c903bed0cead7b1')
      .then(response => {
        console.log(64, response);
        this.statesGeoData = JSON.parse(
          response.data.files['us_features.json'].content
        );
      })
      .catch(error => {
        console.log(45, error);
      });
  },

  methods: {
    clickStateData(state) {
      console.log('clicked');
    },
    showStateData(state) {
      console.log(state);
    }
  }
};
</script>

<style lang="scss" scoped>
.container__map {
  width: 100%;
  height: 600px;
  border: 1px solid red;
  margin-bottom: 2.5rem;
}

path:hover {
  fill-opacity: 0.7;
}
</style>
