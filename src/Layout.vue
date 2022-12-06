<script setup>
import { ref, onMounted } from 'vue';
import { useContentStore } from '@/stores-content';
import { useAuthStore } from '@/user/stores-auth';

import LoadingSpinner from '@/components/LoadingSpinner.vue';
import HeaderMain from '@/components/HeaderMain.vue';
import HeaderOffcanvas from '@/components/HeaderOffcanvas.vue';

const contentStore = useContentStore();
const isLoading = ref(true);

onMounted(async () => {
  const authStore = useAuthStore();

  if (authStore.isLoggedIn) {
    await contentStore.getPosts();
    isLoading.value = false;
  }
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

<style lang="sass" scoped>
.main-container
  position: relative
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
