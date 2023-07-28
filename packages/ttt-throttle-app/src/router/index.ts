import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store/store.tsx';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/effects',
      name: 'effects',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EffectsView.vue')
    },
    {
      path: '/throttle/:locoId?',
      name: 'throttle',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ThrottleView.vue')
    },
    {
      path: '/turnouts',
      name: 'turnouts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TurnoutsView.vue')
    },
    {
      path: '/routes',
      name: 'routes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RoutesView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && !store.layoutId) {
    console.log('router.beforeEach', to.path, from.path, store.layoutId);
    // router.replace('/');
    next({ name: 'home' });
  } else  if (to.path === '/' && store.layoutId) {
    next({ name: 'throttle' });
  } else {
    next();
  }
});

export default router
