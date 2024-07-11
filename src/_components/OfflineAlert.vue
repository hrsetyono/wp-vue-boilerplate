<script setup>
import { onBeforeMount } from 'vue';
import { useUIStore } from '@/stores-ui';

const uiStore = useUIStore();

onBeforeMount(() => {
  window.addEventListener('online', () => { uiStore.isOnline = true; });
  window.addEventListener('offline', () => { uiStore.isOnline = false; });
});
</script>

<template>
  <Transition
    name="fade"
    mode="out-in"
    appear
  >
    <div v-if="!uiStore.isOnline" class="offline-alert">
      <p>
        You are currently offline
      </p>
    </div>
  </Transition>
</template>

<style lang="sass" scoped>
.offline-alert
  background-color: var(--colorAlert)
  position: fixed
  z-index: 100
  left: 0
  bottom: 0
  right: 0
  font-size: var(--sFontSize)
  text-align: center
  color: var(--textInvert)
</style>
