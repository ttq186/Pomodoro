import axios from 'axios';

import {
  getErrorMessageFromServer,
  getTokenDataFromLocalStorage,
} from './utils/serverUtils';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const refreshAccessToken = async () => {
  const tokenData = getTokenDataFromLocalStorage();
  if (!tokenData?.refreshToken) return;

  const { data } = await apiClient.post('/auth/refresh-token', {
    refreshToken: tokenData.refreshToken,
  });
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
    const errorMessage = getErrorMessageFromServer(error);
    if (errorMessage === 'Token has expired!') {
      const config = error?.config;
      config.sent = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        config.headers = {
          ...config.headers,
          authorization: `bearer ${newAccessToken}`,
        };
        return apiClient(config);
      }
    }
    return Promise.reject(error);
  }
);
