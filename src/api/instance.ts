import axios from "axios";

const api = axios.create({ baseURL: "https://daltonz-backend.darkube.app" });

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

export { api };
