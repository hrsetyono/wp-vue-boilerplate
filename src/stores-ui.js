import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', () => {
  const isOffcanvasOpen = ref(false);

  /**
   * Open or close the mobile menu
   */
  function toggleOffcanvas() {
    isOffcanvasOpen.value = !isOffcanvasOpen.value;
    document.body.classList.toggle('has-open-offcanvas', isOffcanvasOpen);
  }

  function closeOffcanvas() {
    isOffcanvasOpen.value = false;
    document.body.classList.remove('has-open-offcanvas');
  }

  return {
    isOffcanvasOpen,
    toggleOffcanvas,
    closeOffcanvas,
  };
});

export default useUIStore;
