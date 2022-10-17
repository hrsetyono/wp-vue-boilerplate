import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_CUSTOM_API,
});

export const wpApi = axios.create({
  baseURL: import.meta.env.VITE_WP_API,
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
});

export default api;
