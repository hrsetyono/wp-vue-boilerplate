import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { authFetch } from '@lib/MyFetch';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const token = ref(localStorage.getItem('userToken'));
  const email = ref(localStorage.getItem('userEmail'));
  const displayName = ref(localStorage.getItem('userDisplayName'));

  const isLoggedIn = computed(() => !!token.value);

  /**
   * Login user and cache the profile data
   */
  async function login(username, password) {
    if (!username) {
      return Promise.reject(new Error('usernameEmpty'));
    }

    if (!password) {
      return Promise.reject(new Error('passwordEmpty'));
    }

    try {
      const response = await authFetch.post('/token', {
        username,
        password,
      });

      // cache the data into store
      token.value = response.token;
      email.value = response.user_email;
      displayName.value = response.user_display_name;

      // cache the data into localStorage
      localStorage.setItem('userToken', response.token);
      localStorage.setItem('userEmail', response.user_email);
      localStorage.setItem('userDisplayName', response.user_display_name);

      return true;
    } catch (error) {
      if (error.code.includes('incorrect_password')) {
        error.message = 'incorrectPassword';
      } else if (error.code.includes('invalid_username')) {
        error.message = 'invalidUsername';
      } else {
        error.message = 'connectionError';
      }

      return Promise.reject(error);
    }
  }

  /**
   * Logout user and clear all cache
   */
  function logout() {
    token.value = '';
    localStorage.removeItem('userToken');

    router.push({
      name: 'login',
      query: { message: 'logoutSuccess' },
    });
  }

  /**
   * Check whether the token is still valid or need to login again
   */
  async function validateToken() {
    if (!token.value) {
      return;
    }

    try {
      // if valid, nothing happen, if invalid it will throw error
      await authFetch.post('/token/validate');
    } catch (error) {
      // If invalid, push back to login
      token.value = '';
      localStorage.removeItem('userToken');

      router.push({
        name: 'login',
        query: { message: 'sessionExpired' },
      });
    }
  }

  return {
    token,
    email,
    displayName,
    isLoggedIn,

    login,
    logout,
    validateToken,
  };
});

export default useAuthStore;
