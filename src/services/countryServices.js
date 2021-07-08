import { config } from '../config';
import { axiosInstance } from '../utils/api';

export const CountryServices = {
  async getAll(key, body = {}) {
    const res = await axiosInstance.get(`${config.baseUrl}admin/countries`);
    return res;
  },
  async delete(key, countryId) {
    const res = await axiosInstance.delete(`${config.baseUrl}admin/countries/${countryId}`);
    return res;
  },
  async create(key, body = {}) {
    const res = await axiosInstance.post(`${config.baseUrl}admin/countries`, body);
    return res;
  },
};
