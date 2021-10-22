import { config } from '../config';
import { axiosInstance } from '../utils/api';

export const DirectionServices = {
  async getAll(key, body = {}) {
    const res = await axiosInstance.get(`${config.baseUrl}admin/directions`);
    return res;
  },
  async delete(key, directionId) {
    const res = await axiosInstance.delete(`${config.baseUrl}admin/directions/${directionId}`);
    return res;
  },
  async create(key, body = {}) {
    const res = await axiosInstance.post(`${config.baseUrl}admin/directions`, body);
    return res;
  },
  async changeState(directionId) {
    const res = await axiosInstance.patch(`${config.baseUrl}admin/directions/${directionId}/change-state`);
    return res;
  },
};
