import { config } from '../config';
import axios from 'axios';

export const BaseInfoServices = {
  async directions(key, body = {}) {
    // TODO key
    const res = axios.get(`${config.baseUrl}info/directions`);
    return res;
  },
};
