import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errorContent: {
      gif: {
        fileName: null,
        alt: null
      },
      title: null
    },
    showStatesDropdown: false
  },

  mutations: {
    setErrorContent(state, data) {
      state.errorContent = data;
    },

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
