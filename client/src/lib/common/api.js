import axios from "axios";
import { getBackendHost } from "../backend";
import useStore from "../../store/index";

// Create an axios instance with a base URL and credentials setting
export const Api = axios.create({
  baseURL: getBackendHost(), // Set the base URL for API requests
  withCredentials: true, // Include credentials (cookies, HTTP auth) in requests
});

console.log(getBackendHost); 

// Set up request interceptor
Api.interceptors.request.use(
  async (config) => {
    // Retrieve the current user session from the Zustand store
    const { userSession } = useStore.getState();

    // If a user session exists, add a custom header to the request
    if (config?.headers && userSession) {
      config.headers["Custom-Session-Header"] = userSession;
    }

    return config; // Return the modified config
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);
