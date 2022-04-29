import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const mutations = {
  cacheUser(state, { token, email, displayName }) {
    state.isLoggedIn = true;
    state.userToken = token;
    state.userEmail = email;
    state.userDisplayName = displayName;
  },

  deleteUserCache(state) {
    state.isLoggedIn = false;
    state.userToken = '';
    state.userEmail = '';
    state.userDisplayName = '';
  },
};

const actions = {
  async login({ commit }, payload) {
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/jwt-auth/v1/token`, {
      username: payload.username,
      password: payload.password,
    });

    const data = response.data;

    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('token', data.token);
    localStorage.setItem('displayName', data.user_display_name);
    localStorage.setItem('email', data.user_email);

    // call cacheUser() from mutations
    await commit('cacheUser', {
      token: data.token,
      email: data.user_email,
      displayName: data.user_display_name,
    });
  },

  async logout({ commit }) {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('displayName');

    commit('deleteUserCache');
  },

  /**
   * Check if user if logged in
   */
  async checkLoginState({ commit }) {
    const token = localStorage.getItem('token');

    // if no token, empty the loggedIn cache
    if (!token) {
      await commit('deleteUserCache');
      return false;
    }

    // if has token, check if it's still valid
    try {
      await axios.post(
        `${process.env.VUE_APP_API_URL}/jwt-auth/v1/token/validate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      
      // if still valid, cache it again
      await commit('cacheUser', {
        token,
        email: localStorage.getItem('email'),
        displayName: localStorage.getItem('displayName'),
      });

      return true;
    } catch (error) {
      localStorage.setItem('token', '');
      return false;
    }
  },
}


const store = {
  // This is global data, use mutations and actions to change this value.
  state: {
    isAdmin: false,
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    userToken: localStorage.getItem('token') || '',
    userEmail: localStorage.getItem('email') || '',
    userDisplayName: localStorage.getItem('displayName') || '',
  },

  mutations,
  actions,
  modules: {
  },
};

export default new Vuex.Store(store);
