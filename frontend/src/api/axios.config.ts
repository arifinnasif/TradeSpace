import axios from "axios";
import { Cookies } from "react-cookie";

// const baseURL = import.meta.env.PROD
//   ? import.meta.env.VITE_API_URL
//   : "http://localhost:8000/api";

const baseURL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: new Cookies().get("token"),
  },
  withCredentials: true,
});

API.interceptors.request.use(
  function (req) {
    console.log("axios req config");
    req.headers["Authorization"] = new Cookies().get("token"); // get updated token from cookies
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// API.interceptors.request.use(
//   function (req) {
//     console.log("axios req config");
//     console.log(req);
//     if (localStorage.getItem("token") == undefined) return req;
//     const token = localStorage.getItem("token")!;
//     console.log(token);
//     if (token) req.headers["Cookie"] = token;
//     return req;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// API.interceptors.response.use(
//   function (res) {
//     console.log("axios res config");
//     console.log(res);
//     console.log(res.headers);
//     localStorage.setItem("token", res.data["token"]);
//     // const token = JSON.parse(localStorage.getItem("token")!);
//     // console.log(token);
//     // if (token) req.headers["token"] = token;
//     return res;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export default API;
