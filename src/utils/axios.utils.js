    import axios from "axios";
    import Cookies from "js-cookie";

    export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api", // Updated port to match your server
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    });

    //Request interceptor
    axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("jwt");
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    );

    //Response interceptor
    axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - redirecting to login.");
        // Add logic to redirect or refresh token
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