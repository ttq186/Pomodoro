export const getErrorMessageFromServer = (error) => {
  const errorMessage = error.response
    ? error.response.data.detail || error.response.detail[0].msg
    : 'Oops, something went wrong. Try later!';
  return errorMessage;
};

export const getRequestConfig = (accessToken) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }
  return config;
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('tokenData')
    ? JSON.parse(localStorage.getItem('tokenData'))
    : null;
};
