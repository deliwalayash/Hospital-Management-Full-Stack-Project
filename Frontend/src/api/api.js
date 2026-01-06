import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

api.interceptors.request.use((config) => {
  const role = localStorage.getItem("role");

  if (role === "doctor") {
    const doctorToken = localStorage.getItem("doctorToken");
    if (doctorToken) {
      config.headers.Authorization = `Bearer ${doctorToken}`;
    }
  } else {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
  }

  return config;
});

export default api;
