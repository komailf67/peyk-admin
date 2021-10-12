import { config } from '../config';
import { axiosInstance } from '../utils/api';

export const cargoServices = {
  async index(key, state) {
    const res = await axiosInstance.get(`${config.baseUrl}admin/cargos?cargo_state=${state}`);
    return res;
  },
  async getCargoesStates() {
    const res = await axiosInstance.get(`${config.baseUrl}admin/states`);
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
  async shipped(key, cargoId) {
    const res = await axiosInstance.put(`${config.baseUrl}admin/cargos/${cargoId}/shipped`);
    return res;
  },
  async delivered(key, cargoId) {
    const res = await axiosInstance.put(`${config.baseUrl}admin/cargos/${cargoId}/delivered`);
    return res;
  },
  async changeState(key, body, cargoId, stateId) {
    const res = await axiosInstance.put(`${config.baseUrl}admin/cargos/${cargoId}/change-state/${stateId}`, body);
    return res;
  },
};
