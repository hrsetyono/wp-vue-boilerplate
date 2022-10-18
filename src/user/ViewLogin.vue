<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/user/stores-user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const message = ref(route.query.message);
const messageType = ref('alert');

/**
 * Do login and handle error / success
 */
const login = async () => {
  const response = await userStore.login(email.value, password.value);

  switch (response.status) {
    // if error
    case 403:
      messageType.value = 'alert';
      message.value = response.message;
      break;

    // if working
    case 200:
      messageType.value = 'good';
      message.value = response.message;

      setTimeout(() => {
        router.push(route.query.redirectTo || { name: 'home' });
      }, 1000);
      break;

    default:
      messageType.value = 'alert';
      message.value = 'Connection error. Is your internet fine?';
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
        :class="`toast is-${messageType}`"
        v-html="message"
      />
    </Transition>

    <form class="user-form" @submit.prevent="login">
      <label class="user-form__field">
        <span>Email</span>
        <input
          v-model="email"
          type="email"
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

    <footer class="form-links">
      
    </footer>
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

  border-left: 4px solid

  :deep(a)
    text-decoration: underline

  &.is-alert
    border-left-color: var(--colorRed)
  &.is-good
    border-left-color: var(--colorGreen)

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
    padding: 1rem

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
