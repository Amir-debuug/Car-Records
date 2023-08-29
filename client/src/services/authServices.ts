import axios from "axios";
import axiosReq from "../axios/axios";
import { authparam } from "../typescript/types";

class authServices {
  async userlogin(data: authparam) {
    try {
      const response = await axios.post("http://localhost:8080/api/user/signin", data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async registerUser(data: authparam) {
    try {
      const response = await axiosReq.post("user/signup", data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async refreshtoken() {
    try {
      const response = await axiosReq.post("refresh/accesstoken", {
        refreshToken: localStorage.getItem("refreshtoken")
      });
      localStorage.setItem("accesstoken", response?.data?.accessToken);
      return response?.data?.access;
    } catch (error) {
      window.location.replace("/login");
    }
  }
}

export default new authServices();
