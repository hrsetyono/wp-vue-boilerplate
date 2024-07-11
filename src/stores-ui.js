import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', () => {
  const isLoading = ref(false);
  const isOnline = ref(true);

  const windowWidth = ref(window.innerWidth);
  const isDesktop = computed(() => windowWidth.value >= 961);
  const isTablet = computed(() => windowWidth.value <= 820);
  const isPhone = computed(() => windowWidth.value <= 480);

  return {
    isLoading,
    isOnline,

    windowWidth,
    isDesktop,
    isTablet,
    isPhone,
  };
});

export default useUIStore;
