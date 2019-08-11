/* eslint-disable no-undef */
import axios from "axios";

const api = axios.create({
  baseURL: "https://redmine.ekreative.com/",
  timeout: 10000,
  headers: {
    Authorization: `Basic ${btoa(
      `${sessionStorage.getItem("login")}:${sessionStorage.getItem("password")}`
    )}`,
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  config => {
    // console.log("request: ", config);
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => {
    // console.log("response: ", response);
    return response;
  },
  error => {
    // console.log("error ", error.response);
    // if (!error.response) {
    //   console.log("Network Error!");
    // }

    // if (error && error.response && error.response.status === 401) {
    //   alert("Unauthorized");
    // }

    if (error && error.response && error.response.status >= 500) {
      alert(`Server Error. ${error.message}`);
    }

    return Promise.reject(error);
  }
);

export default api;
