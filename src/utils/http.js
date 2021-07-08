/* eslint-disable */
import axios from 'axios';
import qs from 'qs';
import _ from 'lodash';
import { storage } from './storage';
import { cookieUtils, getCookie } from './cookie';
import { getLocalizationCookie } from './utils';

// let dispatch = null;
const axiosInstance = axios.create();

export const configAxios = () => {
  // dispatch = store.dispatch;
  axiosInstance.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line no-console
      // check that is it ssr
      var token;
      if (typeof window !== 'undefined') {
        token = storage.getAccessToken();
      } else {
        token = getCookie('accessToken');
      }

      var lang;
      if (typeof window !== 'undefined') {
        lang = storage.getCurrentLanguage();
      } else {
        lang = getLocalizationCookie();
      }

      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }

      let geustUUID = cookieUtils.getGuestUUID();
      if (geustUUID === undefined || geustUUID === null) {
        cookieUtils.setGuestUUID();
      }
      if (config.data) {
        config.data = config.data;
      }
      if (config.params) {
        config.params = config.params;
      }

      // config.headers['Content-Type'] = 'application/json';
      // eslint-disable-next-line no-param-reassign
      if (lang) {
        config.headers['Accept-Language'] = lang;
      }
      config.headers['X-User-Agent'] = geustUUID;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // const originalRequest = error.config;
      // eslint-disable-next-line no-underscore-dangle
      // if (error.response.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line no-console
      // dispatch({ type: 'test_dispatch' });
      // }
      return Promise.reject(error);
    }
  );
};

const NO_CONTENT = 204;
const UNAUTHORIZED = 401;

const pendingRequests = {};

const abortPendingRequests = (key) => {
  if (pendingRequests[key]) {
    pendingRequests[key]('REQUEST_CANCELLED');
    pendingRequests[key] = null;
  }
};

const isInvalidToken = (response) => {
  if (response.status !== UNAUTHORIZED) {
    return false;
  }
  return true;
};

const processResponse = (res) => {
  if (isInvalidToken(res)) {
    return { data: {} };
  }

  if (res.status === NO_CONTENT) {
    const response = { ...res, data: {} };
    return response;
  }
  return res;
};

const handleResponse = (key, options, response, jsonResponse) => {
  const jsonRes = _.isEmpty(jsonResponse) ? {} : jsonResponse;
  const { status } = response;
  const { errors } = { ...jsonRes };
  const resp = {
    status,
    body: jsonResponse,
    errors,
    headers: response.headers,
  };
  return resp;
  // use any dispatchers/method to communicate this data to the store/view
  // dispatch(key, resp)
};

const handleError = (err) => {
  const { data: errorData, status } = err.response;
  if (errorData) {
    const { data, message, error } = errorData;
    const { errData } = error || { code: 0, data: [] };
    const errorObj = { data, message, status, errors: errData };
    return errorObj;
  }
  return { message: '', status: '', errors: {} };
};

const sanitizeParams = (params) => params;

const getDefaultOptions = (options) => options;

// eslint-disable-next-line no-unused-vars
const getHeaders = (accessToken, options) => {
  const defaultHeaders = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    ...(options && options.headers ? options.headers : {}),
  };

  // if (options["headers"]) {
  //   Object.assign(defaultHeaders, options.headers);
  // }

  // if (accessToken) {
  //   return Object.assign(defaultHeaders, {
  //     Authorization: `Bearer ${accessToken}`,
  //   });
  // } else return defaultHeaders;
  return defaultHeaders;
};

const getParams = (queryParams = {}) => queryParams;
const requestsQueue = [];
export const API = {
  async makeRequest(url, key, reqInit, accessToken = '', options = { headers: null }) {
    requestsQueue.push(key);
    abortPendingRequests(key);
    const headers = getHeaders(accessToken, options);
    const option = getDefaultOptions(options);
    const init = { ...reqInit, headers };
    try {
      const res = await axiosInstance({
        url,
        ...init,
        timeout: 30000,
        withCredentials: process.env.NODE_ENV === 'production',
        cancelToken: new axios.CancelToken(function executor(c) {
          pendingRequests[key] = c;
        }),
      });

      for (let i = 0; i < requestsQueue.length; i++) {
        if (requestsQueue[i] === key) {
          requestsQueue.splice(i, 1);
          i--;
        }
      }
      const reponse = processResponse(res);
      return handleResponse(key, option, reponse, reponse.data);
    } catch (err) {
      // error handling logic
      // const errors = handleError(err);
      throw err;
    }
  },

  makeGetRequest(url, key, queryParams, accessToken = '', options = {}) {
    const getData = {
      method: 'GET',
      params: getParams(queryParams),
      paramsSerializer: (p) =>
        qs.stringify(sanitizeParams(p), {
          arrayFormat: 'brackets',
        }),
    };
    return this.makeRequest(url, key, getData, accessToken, options);
  },

  makePostRequest(url, key, body, accessToken = '', params = {}, options = {}) {
    const postData = {
      method: 'POST',
      data: body,
      params: getParams(params),
      paramsSerializer: (p) =>
        qs.stringify(sanitizeParams(p), {
          arrayFormat: 'brackets',
        }),
    };
    return this.makeRequest(url, key, postData, accessToken, options);
  },

  makePutRequest(url, key, body, accessToken = '', options = {}) {
    const putData = {
      method: 'PUT',
      data: body,
      params: getParams(),
      paramsSerializer: (p) =>
        qs.stringify(sanitizeParams(p), {
          arrayFormat: 'brackets',
        }),
    };
    return this.makeRequest(url, key, putData, accessToken, options);
  },

  makeDeleteRequest(url, key, body, accessToken = '', params = {}, options = {}) {
    const deleteData = {
      method: 'DELETE',
      data: body,
      params: getParams(params),
      paramsSerializer: (p) =>
        qs.stringify(sanitizeParams(p), {
          arrayFormat: 'brackets',
        }),
    };
    return this.makeRequest(url, key, deleteData, accessToken, options);
  },
  makePatchRequest(url, key, body, accessToken = '', params = {}, options = {}) {
    const deleteData = {
      method: 'PATCH',
      data: body,
      params: getParams(params),
      paramsSerializer: (p) =>
        qs.stringify(sanitizeParams(p), {
          arrayFormat: 'brackets',
        }),
    };
    return this.makeRequest(url, key, deleteData, accessToken, options);
  },
};
