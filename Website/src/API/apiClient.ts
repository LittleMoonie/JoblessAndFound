// src/api/apiClient.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:5001/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
