// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor (Token add karna)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ya redux se lo
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (Custom error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const url = error.config.url; // endpoint path

      // 🔹 Login / Signup ke liye special message
      if (url.includes("/auth/login") || url.includes("/auth/signup")) {
        return Promise.reject({
          message: error.response.data.message || "Invalid credentials",
        });
      }

      // 🔹 Baaki sab APIs ke liye status-based handling
      switch (status) {
        case 400:
          return Promise.reject({ message: "Bad Request. Please try again." });
        case 401:
          return Promise.reject({ message: "Unauthorized! Please login again." });
        case 403:
          return Promise.reject({ message: "Forbidden! Access denied." });
        case 404:
          return Promise.reject({ message: "Resource not found." });
        case 500:
          return Promise.reject({ message: "Internal server error. Try later!" });
        default:
          return Promise.reject({
            message: error.response.data.message || "Unexpected error occurred",
          });
      }
    }

    // 🔹 Agar server hi reachable na ho
    return Promise.reject({ message: "Network error. Please check your connection." });
  }
);

export default axiosInstance;
