import axios from "axios";

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:8000/api";

const API = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",

    },
    withCredentials: true,

});

API.interceptors.request.use(
    function (req) {
        console.log("axios req config");
        console.log(req);
        if (localStorage.getItem("token") == undefined) return req;
        const token = localStorage.getItem("token")!;
        console.log(token);
        if (token) req.headers["Cookie"] = token;
        return req;
    },
    function (error) {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    function (res) {
        console.log("axios res config");
        console.log(res);
        console.log(res.headers);
        localStorage.setItem("token", res.data["token"]);
        // const token = JSON.parse(localStorage.getItem("token")!);
        // console.log(token);
        // if (token) req.headers["token"] = token;
        return res;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default API;