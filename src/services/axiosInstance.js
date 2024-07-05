export const BASE_URL = "https://shopifyapptst1.bma.ae";

import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

const handleApiError = (error) => {
    if (error.response && error.response.data) {
        return Promise.reject({
            error: error.response.data.error,
            message: error.request.data.message
        });
    } else {
        return Promise.reject({ error: "unknown", message: "" });
    }
};

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.headers) {
            config.headers = {};
            config.headers["Content-Type"] = "application/json; charset=utf-8";
        }

        return config;
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Do something with successful response data
        return response;
    },
    (error) => {
        // Do something with response error
        return handleApiError(error);
    }
);

export default axiosInstance;
