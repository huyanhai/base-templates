import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const base_url = '';

export const request = axios.create({
  baseURL: base_url,
  timeout: 60000
});

export function setupAxios() {
  request.interceptors.request.use((config: AxiosRequestConfig) => {
    return {
      ...config,
      headers: {
        ...config.headers
      },
      params: {
        ...config.params,
        _t: Date.now()
      }
    } as InternalAxiosRequestConfig;
  });

  request.interceptors.response.use(
    (rawResponse) => {
      const { data } = rawResponse;
      return Promise.resolve(data);
    },
    (rawError) => {
      const { data } = rawError.response || {};
      return Promise.reject(data);
    }
  );
}
