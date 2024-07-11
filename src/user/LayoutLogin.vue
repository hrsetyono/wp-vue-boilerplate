<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const _route = useRoute();

const message = ref(_parseRouteMessage(_route.query.message));
const messageType = ref(_route.query.messageType || 'alert');

const updateToast = (newMessage, newMessageType) => {
  message.value = _parseRouteMessage(newMessage);
  messageType.value = newMessageType || 'alert';
};

watch(_route, (newRoute) => {
  message.value = _parseRouteMessage(newRoute.query.message);
  messageType.value = newRoute.query.messageType || 'alert';
});

/**
 * Parse the 'message' code in query params into a helpful message
 */
function _parseRouteMessage(code) {
  switch (code) {
    case 'loginSuccess':
      return 'Login success, redirecting back…';

    case 'logoutSuccess':
      return 'You have successfully logged out';

    case 'registerSuccess':
      return 'You can now login with your new account';

    case 'loginRequired':
      return 'Please login to view that page';

    case 'connectionError':
      return 'Connection Error. If your internet is fine, then there is a server issue.';

    case 'sessionExpired':
      return 'Your session has expired. Please login again.';

    case 'usernameEmpty':
      return 'Username must be filled';

    case 'passwordEmpty':
      return 'Password must be filled';

    case 'invalidUsername':
      return 'Username does not exist';

    case 'incorrectPassword':
      return 'Password is incorrect';

    case 'passwordResetSuccess':
      return 'Success! You can now login with the new password';

    default:
      return code || '';
  }
}
</script>

<template>
  <div class="login-container">
    <figure class="form-logo">
      <img src="/images/logo.svg">
    </figure>

    <Transition name="slide" mode="out-in">
      <!-- eslint-disable vue/no-v-html -->
      <aside
        v-if="message"
        :key="message"
        :class="`toast is-${messageType}`"
        v-html="message"
      />
      <!-- eslint-enable vue/no-v-html -->
    </Transition>

    <router-view
      v-slot="{ Component, route }"
      @message="updateToast"
    >
      <Transition
        name="fade"
        mode="out-in"
        appear
      >
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>
  </div>
</template>

<style lang="sass" scoped>
.login-container
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  min-width: 100vw
  min-height: 100vh
  padding: var(--gridRim)
  background-color: rgba(black, .05)

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
  width: 320px
  border-radius: var(--gRadius)
  box-shadow: var(--shadow0)
  font-size: var(--sFontSize)

  border-left: 4px solid

  :deep(a)
    text-decoration: underline

  &.is-alert
    border-left-color: var(--colorAlert)
  &.is-good
    border-left-color: var(--colorGood)

// Message animation
.slide-enter-from,
.slide-leave-to
  opacity: 0
  transform: translateX(1rem)

.slide-enter-to,
.slide-leave-from
  opacity: 1
  transform: none

.slide-enter-active,
.slide-leave-active
  transition: var(--gTransition)

// View animation
.fade-enter-from,
.fade-leave-to
  opacity: 0
  transform: translateY(1rem)

.fade-enter-to,
.fade-leave-from
  opacity: 1
  transform: none

.fade-enter-active,
.fade-leave-active
  transition: var(--gTransition)
  transition-delay: .3s
</style>
