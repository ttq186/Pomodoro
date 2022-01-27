export const timeToSeconds = (time) => {
  const [minutes, seconds] = time.split(':');
  return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
};

export const secondsToTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  if (minutes < 10) minutes = '0' + minutes;

  let secondsLeft = seconds - minutes * 60;
  if (secondsLeft < 10) secondsLeft = '0' + secondsLeft;
  return minutes + ':' + secondsLeft;
};

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
