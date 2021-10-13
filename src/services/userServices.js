// import { API } from '../utils/http';
import { config } from '../config';
import { axiosInstance } from '../utils/api';

export const userServices = {
  async getUsers() {
    const res = await axiosInstance.get(`${config.baseUrl}admin/users`);
    return res;
  },
  async changeUserState(userId) {
    const res = await axiosInstance.patch(`${config.baseUrl}admin/users/${userId}/change-ban`);
    return res;
  },
  async changeRole(userId) {
    const res = await axiosInstance.patch(`${config.baseUrl}admin/users/${userId}/change-admin`);
    return res;
  },
};
