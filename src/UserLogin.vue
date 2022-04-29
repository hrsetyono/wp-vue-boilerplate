<template>
  <div class="form-wrapper">
    <!-- Error message -->
    <div v-if="message" class="form-message is-error-message">
      {{ message }}
    </div>
    <!-- When redirected from secured page -->
    <div v-else-if="$route.query.message" class="form-message">
      {{ $route.query.message }}
    </div>

    <!-- Main form -->
    <form class="form" @submit.prevent="login">
      <label>
        <span>Email</span>
        <input
          v-model.trim="email"
          type="email"
          placeholder="you@email.com"
        >
      </label>
      <label>
        <span>Password</span>
        <input
          v-model.trim="password"
          type="password"
        >
      </label>
      <button type="submit">
        Log In
      </button>
    </form>

    <!-- Link to Register -->
    <div class="form-footnote">
      <router-link :to="{name: 'UserRegister'}">
        Register Now
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',

      message: '',
    };
  },

  methods: {
    async login() {
      this.message = '';

      try {
        // Call the login function in store.js
        await this.$store.dispatch('login', {
          username: this.email,
          password: this.password,
        });

        // if redirected to login from secured page, redirect back
        if (this.$route.query.redirectTo) {
          this.$router.push({ name: this.$route.query.redirectTo });
        }
        // else redirect to Home
        else {
          this.$router.push({ name: 'Home' });
        }
      } catch (error) {
        this.message = 'Email or password is wrong';
      }
    }
  }
}
</script>

<style lang="sass">
.form-wrapper
  max-width: 600px
  margin: 3rem auto

.form-message
  padding: 0.25rem
  margin-bottom: 1rem
  box-shadow: 0 0 10px 0 rgba(black, .1)
  
  &.is-error-message
    color: red

.form
  padding: 1rem
  border: 1px solid gray

  label
    display: block
    margin-bottom: 1rem

  input
    width: 100%
    padding: 0.25rem 0.5rem

  span
    display: block
    text-transform: uppercase
    font-size: smaller

.form-footnote
  margin-top: 0.5rem
  font-size: smaller
  text-align: center
</style>