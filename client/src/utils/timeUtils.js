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

export const isInNWeekAgo = (date, n) => {
  const checkedDate = new Date(date);
  const today1 = new Date();
  const today2 = new Date();
  const firstDayOfNWeekAgo = new Date(
    today1.setDate(
      today1.getDate() -
        today1.getDay() +
        (today1.getDay() === 0 ? -6 : 1) -
        n * 7
    )
  );
  const lastDayOfNWeekAgo = new Date(
    today2.setDate(today2.getDate() - today2.getDay() - (n - 1) * 7)
  );
  if (checkedDate >= firstDayOfNWeekAgo && checkedDate <= lastDayOfNWeekAgo) {
    return true;
  }
  return false;
};

export const isInNYearAgo = (date, n) => {
  const today = new Date();
  const checkedDate = new Date(date);
  return checkedDate.getFullYear() === today.getFullYear() - n;
};

export const formatDate = (checkedDate) => {
  const dateArr = new Date(checkedDate).toDateString().split(' ');
  const dateAfterFormat = `(${dateArr[0]}) ${dateArr[2]}-${dateArr[1]}`;
  return dateAfterFormat;
};
