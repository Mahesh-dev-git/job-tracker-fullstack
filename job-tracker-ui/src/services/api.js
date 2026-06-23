import axios from "axios";

const API = axios.create({
    baseURL: "https://localhost:7214/api"
    //baseURL: "http://52.66.137.60:5000/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
