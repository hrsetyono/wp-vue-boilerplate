import { createStore } from 'vuex';
import { wpApi, api } from './helpers';

const mutations = {
  setPosts(state, data) {
    state.posts = data;
  },

  /**
   * Open or close the mobile menu
   */
  toggleOffcanvas(state) {
    state.isOffcanvasOpen = !state.isOffcanvasOpen;
    document.body.classList.toggle('has-open-offcanvas', state.isOffcanvasOpen);
  },

  closeOffcanvas(state) {
    state.isOffcanvasOpen = false;
    document.body.classList.remove('has-open-offcanvas');
  },
};

const actions = {
  /**
   * Get list of blog posts
   */
  async getPosts({ commit, state }) {
    if (!state.posts) {
      const response = await wpApi.get('/posts?_embed');
      commit('setPosts', response.data);
    }

    return state.posts;
  },

  /**
   * Get a Page title and content
   */
  async getPage(store, slug) {
    const response = await wpApi.get(`/pages?slug=${slug}`);
    return response.data;
  },
};

const store = createStore({
  state: {
    metaTitle: 'My Website',
    metaDescription: 'Lorem ipsum dolor sit amet adipiscit amit',
    posts: null,
    isOffcanvasOpen: false,
  },

  mutations,
  actions,
  modules: {},
});

export default store;
