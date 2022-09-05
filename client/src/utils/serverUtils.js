export const getErrorMessageFromServer = (error) => {
  const errorMessage = error.response
    ? error.response.data.detail || error.response.detail[0].msg
    : 'Oops, something went wrong. Try later!';
  return errorMessage;
};

export const getTokenDataFromLocalStorage = () => {
  const tokenData = localStorage.getItem('tokenData')
    ? JSON.parse(localStorage.getItem('tokenData'))
    : null;
  return tokenData
};
