import { createApp } from 'vue';
import { createPinia } from 'pinia';

import '@assets/main.sass';
import App from './App.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);

// CUSTOM DIRECTIVE
// app.directive('html-append', (el, binding) => {
//   el.insertAdjacentHTML('beforeend', binding.value);
// });

app.mount('#app');
