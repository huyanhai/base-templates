import axios from 'axios';

let base_url = '';

export const request = axios.create({
  baseURL: base_url,
  timeout: 60000
});

export function setupAxios() {
  request.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        ...config.headers
      },
      params: {
        ...config.params,
        _t: Date.now()
      }
    };
  });

  request.interceptors.response.use(
    (rawResponse) => {
      const { data } = rawResponse;
      Promise.resolve(data);
    },
    (rawError) => {
      const { data } = rawError.response || {};
      return Promise.reject(data);
    }
  );
}
