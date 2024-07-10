import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/_assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/_components', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/_lib', import.meta.url)),
    },
  },
});
