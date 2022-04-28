<template>
  <div class="form-wrapper">
    <!-- For error / success message -->
    <div v-if="$route.query.message" class="form-message">
      {{ $route.query.message }}
    </div>

    <form class="form" @submit.prevent="submit">
      <label>
        <span>Email</span>
        <input
          v-model="email"
          type="email"
          placeholder="you@email.com"
        >
      </label>

      <label>
        <span>Password</span>
        <input v-model="password" type="password">
      </label>

      <button type="submit">
        Log In
      </button>
    </form>

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
  components: {
    Loading
  }
}
</script>

<style lang="sass">
.form-wrapper
  max-width: 600px
  margin: 3rem auto

.form-message
  padding: 0.25rem
  box-shadow: 0 0 0 10px rgba(black, .1)

.form
  padding: 1rem
  border: 1px solid gray

.form-footnote
  font-size: smaller
  text-align: center
</style>