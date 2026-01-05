import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// for jwt token
apiClient.interceptors.request.use(
  async (config) => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }

    // install package - npm install js-cookie
    // Only fetch CSRF token for non-safe methods
    const safeMethods = ["GET", "HEAD", "OPTIONS"];
    if (!safeMethods.includes(config.method.toUpperCase())) {
      let csrfToken = Cookies.get("XSRF-TOKEN");
      if (!csrfToken) {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/csrf-token`, {
          withCredentials: true,
        });
        csrfToken = Cookies.get("XSRF-TOKEN");
        if (!csrfToken) {
          throw new Error("Failed to retrieve CSRF token from cookies");
        }
      }
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const jwtToken = localStorage.getItem("jwtToken");
      if (jwtToken) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
  }
);

export default apiClient;
