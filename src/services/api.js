import axios from "axios";

const API = axios.create({

  baseURL:

    import.meta.env.MODE ===
    "development"

      ? "http://localhost:5000/api"

      : "https://ipmp-backend.onrender.com/api"
});

API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

export default API;