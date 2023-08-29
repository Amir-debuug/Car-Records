import { AxiosInstance } from "axios";
import axiosPrivate from "../axios/useAxiosPrivate";
import { taskfiltertypes } from "../typescript/types";
import { tasksLists } from "../typescript/types";

class taskServices {
  axiosPrivate;
  constructor(axiosPrivate: { (): AxiosInstance; (): any }) {
    this.axiosPrivate = axiosPrivate();
  }

  async getAllTask(filter: taskfiltertypes, search: string, controller: any) {
    try {
      const response = await this.axiosPrivate.get(`task/all?page=${filter?.pageNum}&limit=10`, {
        signal: controller,
        params: {
          search: search,
          make: filter?.make === "All" ? "" : filter?.make
        }
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async createNewTask(data: tasksLists) {
    try {
      const response = await this.axiosPrivate.post("task/create", data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateTask(data: tasksLists, id: string | undefined) {
    try {
      const response = await this.axiosPrivate.patch(`task/update/${id}`, data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteTask(id: string | undefined) {
    try {
      const response = await this.axiosPrivate.delete(`task/delete/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new taskServices(axiosPrivate);
