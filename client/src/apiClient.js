import axios from 'axios';

import {
  getErrorMessageFromServer,
  getTokenDataFromLocalStorage,
} from './utils/serverUtils';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const refresh_access_token = async () => {
  const tokenData = getTokenDataFromLocalStorage();
  if (!tokenData?.refreshToken) return;

  const { data } = await apiClient.post('/auth/refresh-token', {
    refreshToken: tokenData.refreshToken,
  });
  console.log(data);
  localStorage.setItem('tokenData', JSON.stringify({ ...tokenData, ...data }));
  return data.refreshToken;
};

apiClient.interceptors.request.use(
  async (config) => {
    const tokenData = getTokenDataFromLocalStorage();
    if (tokenData?.accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `bearer ${tokenData.accessToken}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const error_message = getErrorMessageFromServer(error);
    if (error_message === 'Token has expired!') {
      const config = error?.config;
      config.sent = true;
      const new_access_token = await refresh_access_token();
      config.headers = {
        ...config.headers,
        authorization: `bearer ${new_access_token}`,
      };
      return apiClient(config);
    }
    return Promise.reject(error);
  }
);
