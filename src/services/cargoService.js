import { config } from '../config';
import { axiosInstance } from '../utils/api';

export const cargoServices = {
  async create(key, body = {}) {
    const res = await axiosInstance.post(`${config.baseUrl}users/cargos`, body);
    return res;
  },
};
