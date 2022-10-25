<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import LoadingSpinner from '@/components/LoadingSpinner.vue';

const _route = useRoute();

const message = ref(_route.query.message);
const messageType = ref(_route.query.messageType || 'alert');
const isLoading = ref(false);

const updateToast = (newMessage, newMessageType) => {
  message.value = newMessage;
  messageType.value = newMessageType || 'alert';
};

const updateLoading = (newState) => {
  isLoading.value = newState;
};

watch(_route, (newRoute) => {
  message.value = newRoute.query.message || '';
  messageType.value = newRoute.query.messageType || 'alert';
});
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
      @loading="updateLoading"
    >
      <Transition
        name="fade"
        mode="out-in"
        appear
      >
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>

    <LoadingSpinner v-if="isLoading" />
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
    border-left-color: var(--colorRed)
  &.is-good
    border-left-color: var(--colorGreen)

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
