import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { STATE_CODES } from '@/constants/stateCodes.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,

    children: [
      {
        path: '/state/:id',
        name: 'State',
        component: Home,
        beforeEnter(to, from, next) {
          if (STATE_CODES[to.params.id]) {
            console.log('here');
            next();
          } else {
            next({ name: '404' });
          }
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
