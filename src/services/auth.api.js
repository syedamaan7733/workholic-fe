import axios from "axios";

import { authToken } from "./token.service";
import { URL } from "./employeeService";

const api = axios.create({
  baseURL: `${URL}/auth`,
});

api.interceptors.request.use((config) => {
  const token = authToken.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("User is unauthorized! Redirecting to login...");
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  // Register a new user
  register: async (userData) => {
    const response = await api.post("/register", userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post("/logout");
      return response.data;
    } catch (error) {
      console.log(error);
      return { success: true };
    }
  },

  // Get current user data
  getCurrentUser: async () => {
    const response = await api.get("/checkMe");
    return response.data;
  },
};
