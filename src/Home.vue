<template>
  <div class="page">
    <h1>Hello {{ user }}</h1>
    <p>You are logged in</p>
    <a href="#logout" @click.prevent="logout">
      Logout
    </a>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('displayName');

      this.$store.commit('logoutUser');
      this.$router.push({ name: 'UserLogin' });
    }
  }
}
</script>

<style>

</style>