import axios from "axios";
const API_ENDPOINT = "http://localhost:8000/";
// const API_ENDPOINT = "https://workbench.onrender.com/";

const FRONTEND_ENDPOINT = "";
const DataService = axios.create({
    baseURL: API_ENDPOINT,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
});
DataService.interceptors.request.use(function (config) {
    const token = localStorage.getItem("Token");
    config.headers.Auth = token ? `${token}` : "";
    return config;
});
export { DataService, API_ENDPOINT, FRONTEND_ENDPOINT };
