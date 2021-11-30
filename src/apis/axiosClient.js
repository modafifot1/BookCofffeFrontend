import axios from "axios";
// const baseURL = "https://obscure-inlet-52224.herokuapp.com/api/v1";
const baseURL = "http://localhost:8000/api/v1";

export const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
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
