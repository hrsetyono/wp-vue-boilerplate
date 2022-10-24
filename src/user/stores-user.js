import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { authApi, api } from '@/user/helpers-user';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const token = ref(localStorage.getItem('userToken'));
  const email = ref(localStorage.getItem('userEmail'));
  const displayName = ref(localStorage.getItem('userDisplayName'));

  const isLoggedIn = computed(() => !!token.value);

  /**
   * Login user and cache the profile data
   */
  async function login(username, password) {
    try {
      const response = await authApi.post('/token', {
        username,
        password,
      });

      // cache the data into store
      token.value = response.data.token;
      email.value = response.data.user_email;
      displayName.value = response.data.user_display_name;

      // cache the data into localStorage
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userEmail', response.data.user_email);
      localStorage.setItem('userDisplayName', response.data.user_display_name);

      return {
        status: response.status,
        message: 'Login success, redirecting back…',
      };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
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
      query: { message: 'You have successfully logged out' },
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
      const headers = {
        Authorization: `Bearer ${token.value}`,
      };

      await authApi.post('/token/validate', {}, { headers });
      // If token is valid, do nothing
    } catch (error) {
      // If invalid, push back to login
      token.value = '';
      localStorage.removeItem('userToken');

      router.push({
        name: 'login',
        query: { message: 'Your session has expired. Please login again.' },
      });
    }
  }

  /**
   * User registration
   */
  async function register(fields) {
    try {
      const response = await api.post('/register', fields);

      return {
        status: response.status,
      };
    } catch (error) {
      return {
        status: error.response.status,
        code: error.response.data.code,
        message: error.response.data.message,
      };
    }
  }

  async function getRegisterNonce() {
    const response = await api.get('/register/nonce');
    return response.data;
  }

  return {
    token,
    email,
    displayName,
    isLoggedIn,

    login,
    logout,
    validateToken,
    register,
    getRegisterNonce,
  };
});

export default useUserStore;
