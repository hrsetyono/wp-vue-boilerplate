import { useAuthStore } from './stores-auth';

import ViewLogin from './ViewLogin.vue';
import ViewRegister from './ViewRegister.vue';
import ViewPasswordForgot from './ViewPasswordForgot.vue';
import ViewPasswordReset from './ViewPasswordReset.vue';

export const userRoutes = [
  {
    path: '/login',
    name: 'login',
    component: ViewLogin,
    meta: {
      title: 'Login',
      layout: 'LayoutLogin',
      allowGuest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: ViewRegister,
    meta: {
      title: 'Register',
      layout: 'LayoutLogin',
      allowGuest: true,
    },
  },
  {
    path: '/password-forgot',
    name: 'passwordForgot',
    component: ViewPasswordForgot,
    meta: {
      title: 'Forgot Password',
      layout: 'LayoutLogin',
      allowGuest: true,
    },
  },
  {
    path: '/password-reset',
    name: 'passwordReset',
    component: ViewPasswordReset,
    meta: {
      title: 'Reset Password',
      layout: 'LayoutLogin',
      allowGuest: true,
    },
  },
];

/**
 * Get route args depending on auth state
 */
export const checkUserAuth = (to) => {
  const authStore = useAuthStore();

  // if allow guest, no need to check for loggedIn status
  if (to.meta.allowGuest) {
    return null;
  }

  // if not logged in
  if (!authStore.isLoggedIn) {
    return {
      name: 'login',
      query: {
        redirectTo: to.fullPath,
        message: 'loginRequired',
      },
    };
  }

  return null;
};

export default userRoutes;
