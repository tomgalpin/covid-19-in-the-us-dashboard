import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Plugins:
import ChoroplethMap from 'vue-choropleth';

// Styles:
import './assets/styles/main.scss';

Vue.component(ChoroplethMap);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
