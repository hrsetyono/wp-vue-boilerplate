<script setup>
import { ref } from 'vue';

import LoadingSpinner from '@components/LoadingSpinner.vue';
import HeaderMain from './_HeaderMain.vue';
import HeaderOffcanvas from './_HeaderOffcanvas.vue';

const isLoading = ref(false);
const updateLoading = (newState) => {
  isLoading.value = newState;
};
</script>

<template>
  <div class="main-container">
    <HeaderMain />
    <HeaderOffcanvas />

    <LoadingSpinner v-if="isLoading" />

    <router-view
      v-slot="{ Component, route }"
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
  </div>
</template>

<style lang="sass" scoped>
.main-container
  position: relative
  max-width: 1200px
  margin: 0 auto
  padding-bottom: var(--blockGap)
  box-shadow: var(--shadowThin)

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
