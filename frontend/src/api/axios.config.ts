import axios from "axios";

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:8000/api";

const API = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    withCredentials: true,

});

API.interceptors.request.use(
    function (req) {
        const token = JSON.parse(localStorage.getItem("token")!);
        if (token) req.headers["token"] = token;
        return req;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default API;