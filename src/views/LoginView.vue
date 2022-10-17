<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const email = ref('');
const password = ref('');
const message = ref('');

const userStore = useUserStore();
const login = async () => {
  const result = await userStore.login(email.value, password.value);

  console.log(result);
  // if error
  if (result.response.status === 403) {
    message.value = result.response.data.message;
  }
};
</script>

<template>
  <section>
    <figure class="form-logo">
      <img src="/images/logo.svg">
    </figure>

    <Transition name="fade" mode="out-in">
      <aside
        v-if="message"
        :key="message"
        class="toast"
        v-html="message"
      />
    </Transition>

    <form class="user-form" @submit.prevent="login">
      <label class="user-form__field">
        <span>Email</span>
        <input
          v-model="email"
          type="email"
          placeholder="your@email.com"
        >
      </label>
      <label class="user-form__field">
        <span>Password</span>
        <input v-model="password" type="password">
      </label>

      <div class="user-form__submit">
        <button type="submit">
          Log In
        </button>
      </div>
    </form>
  </section>
</template>

<style lang="sass" scoped>
@import "@/css/helpers"

.form-logo
  margin-bottom: 2rem
  text-align: center

  img
    max-height: 50px

.toast
  background-color: var(--textInvert)
  margin-bottom: 1rem
  padding: 0.5rem 1rem
  max-width: 320px
  border-radius: var(--gRadius)
  box-shadow: var(--shadow0)
  font-size: var(--sFontSize)

  border-left: 4px solid var(--colorAlert)

.user-form
  display: flex
  flex-direction: column
  row-gap: 1rem
  column-gap: 1rem

  width: 320px
  background-color: var(--textInvert)
  padding: 1.5rem
  border-radius: var(--gRadius)
  box-shadow: var(--shadow0)

  @media ($below-xs)
    padding: 0.5rem

.user-form__field
  display: flex
  flex-direction: column
  background-color: rgba(black, .05)
  padding: 0.75rem
  border: 2px solid rgba(black, .05)
  border-radius: var(--gRadius)

  &:focus-within
    border-color: var(--color1)

  span
    margin-bottom: 0.5rem
    letter-spacing: 0.05em
    text-transform: uppercase
    font-weight: 700
    font-size: var(--xsFontSize)

  input
    background-color: transparent
    border: none
    outline: none
    padding: 0

.user-form__submit
  text-align: right

// Animation
.fade-enter-from,
.fade-leave-to
  opacity: 0
  transform: translateX(1rem)

.fade-enter-to,
.fade-leave-from
  opacity: 1
  transform: none

.fade-enter-active,
.fade-leave-active
  transition: var(--gTransition)
</style>
