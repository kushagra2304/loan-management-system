import axios from "axios";

const api = axios.create({
  baseURL: "https://loan-management-system-1-j7hn.onrender.com/api",
});

export default api;
