// import { API } from '../utils/http';
import { config } from '../config';
import { axiosInstance } from '../utils/api';
import axios from 'axios';

export const AuthService = {
  // async checkPhone(key, body = {}) {
  //   const res = await API.makePostRequest(`${config.baseUrl}customers/phone/verification/check`, key, body);
  //   return res;
  // },
  async checkPhone(key, body = {}) {
    const res = await axiosInstance.post(`${config.baseUrl}users/auth/send-code`, body);
    // const res = axios.post(`${config.baseUrl}users/auth/send-code`, body);

    // const res = axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return res;
  },
  async login(key, body = {}) {
    const res = await axiosInstance.post(`${config.baseUrl}users/auth/login`, body);
    // const res = axios.post(`${config.baseUrl}users/auth/login`, body);
    return res;
  },
  async update(body = {}) {
    const res = await axiosInstance.put(`${config.baseUrl}users/profile`, body);
    return res;
  },
};
