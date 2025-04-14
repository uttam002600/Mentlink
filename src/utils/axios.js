import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mentlink.onrender.com/api/v1",
  withCredentials: true,
});
// https://mentlink.onrender.com/api/v1
// http://localhost:8001/api/v1
