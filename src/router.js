import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

import Home from './Home.vue';
import UserLogin from './UserLogin.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
    meta: {
      title: 'Login',
      noAuthRequired: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  },
});

// Set SEO metatag
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | My App`;
  next();
});

// Logged-in state check
router.beforeEach((to, from, next) => {
  // redirect to Login page if auth required but not logged in
  if (!to.meta.noAuthRequired && !store.state.isLoggedIn) {
    next({
      name: 'UserLogin',
      query: {
        redirectTo: to.name,
        message: 'Please login to visit that page',
      },
    });
  }

  // redirect to Home if page is admin only but opened by non-admin
  if (to.meta.adminOnly && !store.state.isAdmin) {
    next({
      name: 'Home',
      query: { notAllowed: true },
    });
  }

  next();
});

export default router;