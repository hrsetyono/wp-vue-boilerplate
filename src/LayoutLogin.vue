<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const isLoading = ref(true);
</script>

<template>
  <div class="login-container">
    <router-view v-slot="{ Component, route }">
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
  width: 100vw
  height: 100vh
  background-color: rgba(black, .05)

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
