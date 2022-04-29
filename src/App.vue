<template>
  <div id="app">
    <header class="main-header">
      <router-link :to="{ name: 'Home' }">
        <img alt="Logo" src="./assets/logo.png">
      </router-link>

      <nav v-if="$store.state.isLoggedIn">
        <!-- Show menu navigation -->

        <a href="#logout" @click.prevent="logout">
          Logout
        </a>
      </nav>
    </header>

    <router-view />

    <footer class="main-footer">
      © Copyright My App - All rights reserved
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  async created() {
    // only check valid if coming from pages that require auth
    if (this.$route.meta.noAuthRequired) {
      return;
    }

    const isValid = await this.$store.dispatch('checkLoginState');

    if (!isValid) {
      this.$router.push({
        name: 'UserLogin',
        query: {
          redirectTo: this.$route.name,
        },
      });
    }
  },

  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push({ name: 'UserLogin' });
    }
  }
}
</script>

<style lang="sass">
*,
*::before,
*::after
  box-sizing: border-box

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  margin-top: 60px

.main-header
  display: flex
  justify-content: center
  max-width: 1000px
  margin: 0 auto 2rem
  padding: 0.25rem 0
  border-bottom: 1px solid

  img
    max-height: 60px

  nav
    margin-left: auto
  
.main-footer
  max-width: 1000px
  margin: 3rem auto 0
  padding: 0.25rem 0
  border-top: 1px solid
  text-align: center

  font-size: smaller
</style>
