import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAnalytics from 'vue-analytics';

// Styles:
import './assets/styles/main.scss';

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: 'UA-40101532-3',
  checkDuplicatedScript: true,
  router
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
