import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3001" });

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

export { api };
