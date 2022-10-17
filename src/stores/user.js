import { ref } from 'vue';
import { defineStore } from 'pinia';
import { authApi } from '../helpers';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);
  const user = ref({ token: null });

  /**
   * Login user and cache the profile data
   */
  async function login(username, password) {
    try {
      const response = await authApi.post('/token', {
        username,
        password,
      });

      isLoggedIn.value = true;
      user.value = {
        token: response.data.token,
        email: response.data.user_email,
        displayName: response.data.user_display_name,
      };

      return true;
    } catch (error) {
      return error;
    }
  }

  /**
   * Logout user and clear all cache
   */
  async function logout() {
    isLoggedIn.value = false;
    user.value = { token: null };
  }

  /**
   * Check whether the token is still valid or need to login again
   */
  async function validateToken(token) {
    try {
      await authApi.post(
        `${process.env.VUE_APP_AUTH_URL}/token/validate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // commit('loginUser', {
      //   token,
      //   email: localStorage.getItem('email'),
      //   displayName: localStorage.getItem('displayName'),
      // });

      return true;
    } catch (error) { // if token is invalid
      user.value.token = null;
      return false;
    }
  }

  return {
    isLoggedIn,
    user,

    login,
    logout,
    validateToken,
  };
});

export default useUserStore;
