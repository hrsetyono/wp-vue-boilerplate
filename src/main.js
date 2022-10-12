import { createApp } from 'vue';
import './style.sass';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(router);
app.use(store);

// CUSTOM DIRECTIVE
// app.directive('html-append', (el, binding) => {
//   el.insertAdjacentHTML('beforeend', binding.value);
// });

app.mount('#app');
