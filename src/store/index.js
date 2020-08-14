import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showStatesDropdown: false
  },

  mutations: {
    setStatesDropdown(state, data) {
      state.showStatesDropdown = data;
    },

    toggleStatesDropdown(state) {
      state.showStatesDropdown = !state.showStatesDropdown;
    }
  },

  actions: {},
  modules: {}
});
