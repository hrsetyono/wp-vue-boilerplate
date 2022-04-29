<template>
  <div class="form-wrapper">
    <div v-if="message" class="form-message is-error-message">
      {{ message }}
    </div>

    <form class="form" @submit.prevent="register">
      <label>
        <span>Name</span>
        <input
          v-model.trim="name"
          type="text"
          placeholder="Full Name"
        >
      </label>
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
      <label>
        <span>Password Repeat</span>
        <input
          v-model.trim="passwordRepeat"
          type="password"
        >
      </label>
      
      <button type="submit">
        Register
      </button>
    </form>

    <div class="form-footnote">
      Already have an account?
      <router-link :to="{name: 'UserLogin'}">
        Login Now
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRegister',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',

      message: '',
    };
  },

  methods: {
    async register() {
      this.message = '';

      try {
        // Call the login function in store.js
        await this.$store.dispatch('register', {
          name: this.name,
          username: this.email,
          password: this.password,
          passwordRepeat: this.passwordRepeat,
        });

        // if success, redirect to Login with message
        this.$router.push({
          name: 'UserLogin',
          query: {
            message: 'Register successfull! You can now login'
          },
        });
      } catch (error) {
        this.message = this.message
          ? error.response.data.message
          : 'No response from server';
      }
    }
  }
}
</script>

<style lang="sass">
</style>