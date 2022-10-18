import axios from 'axios';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
});

function addTokenHeader(config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_CUSTOM_API,
});

const wpApi = axios.create({
  baseURL: import.meta.env.VITE_CUSTOM_API,
});

api.interceptors.request.use(addTokenHeader);
wpApi.interceptors.request.use(addTokenHeader);

export {
  api,
  wpApi,
  authApi,
};

export default authApi;
