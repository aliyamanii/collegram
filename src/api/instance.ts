import axios from "axios";
import { logOut } from "../utils/logOut";
import { errorToast } from "../utils/customToast";
import { toast } from "react-toastify";

const api = axios.create({ baseURL: "https://daltonz-backend.darkube.app" });

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      logOut();
    }
    return Promise.reject(error.response.data);
  }
);

export { api };
