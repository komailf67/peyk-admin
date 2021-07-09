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
};
