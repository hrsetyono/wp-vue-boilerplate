import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_CUSTOM_API,
});

const wpApi = axios.create({
  baseURL: import.meta.env.VITE_WP_API,
});

// If logged in, add Authentication Header to the API call
const token = localStorage.getItem('token');
if (token) {
  const addTokenHeader = (config) => {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  };

  api.interceptors.request.use(addTokenHeader);
  wpApi.interceptors.request.use(addTokenHeader);
}

export {
  api,
  wpApi,
};

export default api;
