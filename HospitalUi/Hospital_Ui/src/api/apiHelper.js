// src/api/apiHelper.js
import axios from "axios";
import { getToken } from "../context/AuthContext";

const api = axios.create({
  baseURL: "https://localhost:7222/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;

