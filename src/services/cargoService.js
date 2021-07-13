import { config } from '../config';
import { axiosInstance } from '../utils/api';

export const cargoServices = {
  async index(key, body = {}) {
    const res = await axiosInstance.get(`${config.baseUrl}admin/cargos?cargo_state=pending,shipped`);
    return res;
  },
  async create(key, body = {}) {
    const res = await axiosInstance.post(`${config.baseUrl}users/cargos`, body);
    return res;
  },
  async verify(key, body = {}, cargoId) {
    const res = await axiosInstance.put(`${config.baseUrl}admin/cargos/${cargoId}/verify`, body);
    return res;
  },
  async reject(key, body = {}, cargoId) {
    const res = await axiosInstance.put(`${config.baseUrl}admin/cargos/${cargoId}/reject`, body);
    return res;
  },
};
