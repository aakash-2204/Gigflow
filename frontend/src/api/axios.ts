import axios from "axios";

const API = axios.create({
  baseURL:
    "https://gigflow-w412.onrender.com/api",
});

export default API;