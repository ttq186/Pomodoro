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

export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

export const isInCurrWeek = (date) => {
  const checkedDate = new Date(date);
  const today = new Date();
  const firstDayOfCurrWeek = new Date(
    today.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
    )
  );
  const lastDayOfCurrWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 7)
  );
  if (checkedDate >= firstDayOfCurrWeek && checkedDate <= lastDayOfCurrWeek) {
    return true;
  }
  return false;
};
