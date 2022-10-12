<script setup>
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import LoadingSpinner from './components/LoadingSpinner.vue';
import HeaderMain from './components/HeaderMain.vue';
import HeaderOffcanvas from './components/HeaderOffcanvas.vue';

const store = useStore();
const isLoading = ref(true);

onBeforeMount(async () => {
  await store.dispatch('getPosts');
  isLoading.value = false;
});
</script>

<template>
  <div class="main-container">
    <HeaderMain />
    <HeaderOffcanvas />

    <LoadingSpinner v-if="isLoading" />
    <router-view v-else v-slot="{ Component, route }">
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

<style lang="sass">
.main-container
  max-width: 1200px
  margin: 0 auto
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
