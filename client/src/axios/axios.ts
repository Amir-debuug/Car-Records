import axios from "axios";

const axiosReq = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    Accept: "application/json",
    authorization: `Bearer ${localStorage.getItem("accesstoken")}`
  }
});

export default axiosReq;
