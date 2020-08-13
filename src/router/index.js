import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store/index.js';
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
        component: Home
      }
    ]
  },
  {
    path: '/state/error',
    name: 'State Error',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // Limit API errors and validate 'State' code,
  // otherwise send to a 'State' specific error page.
  if (to.name === 'State' && !STATE_CODES[to.params.id]) {
    const statesErrorContent = {
      gif: {
        fileName: 'shrug.gif',
        alt: `A guy wearing a coat, shrugging.`
      },
      title: `Sorry, the U.S. State "${to.params.id}" you are looking for doesn't exist.`
    };

    store.commit('setErrorContent', statesErrorContent);
    next({ name: 'State Error' });
  } else if (to.name === 'State Error') {
    next();
  } else {
    const errorContent = {
      gif: {
        fileName: 'lost.gif',
        alt: `The little boy from the movie 'Up', eating a chocolate bar, thinking.`
      },
      title: `Sorry, the page you are looking for doesn't exist.`
    };

    store.commit('setErrorContent', errorContent);
    next();
  }
});

export default router;
