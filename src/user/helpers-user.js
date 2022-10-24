import axios from 'axios';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
});

const api = axios.create({
  baseURL: import.meta.env.VITE_CUSTOM_API,
});

export {
  api,
  authApi,
};

export default authApi;
