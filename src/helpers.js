import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const wpApi = axios.create({
  baseURL: import.meta.env.VITE_WP_API_URL,
});

export default api;
