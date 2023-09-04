import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage.get("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
export const api = axios.create({ baseURL: "http://localhost:3001" });
