import axios from "axios";

const API_URL = "https://api-rest-kanban-b952.onrender.com/api";

const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setToken(token) {
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default apiInstance;
