import axios from 'axios';

// Base URL of the backend
const API = axios.create({
  baseURL: 'http://localhost:8080', // our endpoint

  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};
export default API;
