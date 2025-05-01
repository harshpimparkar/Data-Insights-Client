import axios from "axios";
import Cookies from "js-cookie";

// Log the API URL to help with debugging
const API_URL = "https://data-insights-backend.onrender.com/api";
console.log("API URL being used:", API_URL);

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Log each request for debugging
    console.log("Making request to:", config.baseURL + config.url);
    
    const token = Cookies.get("jwt");
    if (token) {
      console.log("Token found in cookies");
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("No authentication token found in cookies");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - redirecting to login.");
      console.error("Response data:", error.response.data);
    }
    // Use a utility function to handle errors consistently
    const errorMessage = handleAxiosError(error);
    console.error("Response error:", errorMessage);

    return Promise.reject(error);
  }
);

// Error handling utility function
const handleAxiosError = (error) => {
  if (error.response) {
    return error.response.data.message || "An error occurred.";
  } else if (error.request) {
    return "No response received from the server.";
  } else {
    return "Request setup error: " + error.message;
  }
};

export default axiosInstance;