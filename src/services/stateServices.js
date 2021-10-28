// import { API } from '../utils/http';
import { config } from '../config';
import { axiosInstance } from '../utils/api';

export const stateServices = {
  async getStates() {
    const res = await axiosInstance.get(`${config.baseUrl}admin/states`);
    return res;
  },
  async createState(params) {
    const res = await axiosInstance.post(`${config.baseUrl}admin/states`, params);
    return res;
  },
  async deleteState(stateId) {
    const res = await axiosInstance.delete(`${config.baseUrl}admin/states/${stateId}`);
    return res;
  },
};
