import { DateTime } from 'luxon';

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

export const isInNWeekAgo = (date, nWeekAgo) => {
  const checkedDate = new Date(date);
  const firstDayInNWeekAgo = DateTime.local()
    .startOf('week')
    .minus({ days: nWeekAgo * 7 });
  const lastDayInNWeekAgo = DateTime.local()
    .endOf('week')
    .minus({ days: nWeekAgo * 7 });
  if (checkedDate >= firstDayInNWeekAgo && checkedDate <= lastDayInNWeekAgo) {
    return true;
  }
  return false;
};

export const isInNYearAgo = (date, nYearAgo) => {
  const today = new Date();
  const checkedDate = new Date(date);
  return checkedDate.getFullYear() === today.getFullYear() - nYearAgo;
};

export const formatDate = (checkedDate) => {
  const dateArr = new Date(checkedDate).toDateString().split(' ');
  const dateAfterFormat = `${dateArr[2]}-${dateArr[1]}`;
  return dateAfterFormat;
};

export const formatServerDatetime = (datetime) => {
  if (!datetime) return 'N/A';
  const clientDate = new Date(datetime).toLocaleString();
  const datePart = clientDate.split(',')[0];
  const dateArr = datePart.split('/');
  const result = `${dateArr[1]}-${dateArr[0]}-${dateArr[2]}`;
  return result;
};
