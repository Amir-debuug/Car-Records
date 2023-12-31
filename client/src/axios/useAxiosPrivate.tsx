import jwtDecode from "jwt-decode";
import authservices from "../services/authServices";
import axios from "axios";

const useAxiosPrivate = () => {
  const axiosPrivate = axios.create({
    baseURL: "http://localhost:8080/api/",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${localStorage.getItem("accesstoken")}`
    }
  });

  axiosPrivate.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      const token: any = localStorage.getItem("accesstoken");
      const decoded: any = jwtDecode(token);
      if (currentDate.getTime() > decoded?.exp * 1000) {
        const newToken = await authservices.refreshtoken();
        config.headers.authorization = `Bearer ${newToken}`;
        return config;
      }
      config.headers.authorization = `Bearer ${localStorage.getItem("accesstoken")}`;

      return config;
    },
    (err) => {
      Promise.reject(err);
    }
  );

  return axiosPrivate;
};

export default useAxiosPrivate;
