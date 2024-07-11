<script setup>
/**
 * Fix mobile browser bug with vh counting the adress bar
 * Instead of using '100vh', use 'var(--100vh)'
 */
import { onBeforeMount } from 'vue';
import { debounce } from 'lodash';
import { useUIStore } from '@/stores-ui';

const uiStore = useUIStore();

const addHeightVar = () => {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--100vh', `${vh}px`);
};

onBeforeMount(() => {
  // adapt the value of 100vh
  setTimeout(addHeightVar, 200);
  window.addEventListener('resize', debounce(() => {
    addHeightVar();
    uiStore.windowWidth = window.innerWidth;
  }, 200));
});
</script>

<template>
  <div class="vh-fix" />
</template>

<style lang="sass" scoped>
</style>
