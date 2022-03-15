import axios from "axios";
import Cookies from "js-cookie";
// const baseURL = "https://hidden-citadel-92766.herokuapp.com/api/v1";
const baseURL = "http://localhost:8000/api/v1";

export const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.defaults.headers.authorization = `Bearer ${Cookies.get("token")}`;
axiosClient.interceptors.request.use((config) => {
  return config;
});
axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    throw err;
  }
);
