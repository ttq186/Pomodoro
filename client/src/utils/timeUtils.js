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

export const getFirstAndLastDateInNWeekAgo = (nWeekAgo) => {
  const firstDateInNWeekAgo = DateTime.local()
    .startOf('week')
    .minus({ days: nWeekAgo * 7 })
    .toISODate();
  const lastDateInNWeekAgo = DateTime.local()
    .endOf('week')
    .minus({ days: nWeekAgo * 7 })
    .toISODate();
  return [firstDateInNWeekAgo, lastDateInNWeekAgo];
};

export const getFirstAndLastDateInNYearAgo = (nYearAgo) => {
  const firstDateInNYearAgo = DateTime.local()
    .minus({ years: nYearAgo })
    .startOf('year')
    .toISODate();
  const lastDateInNYearAgo = DateTime.local()
    .minus({ years: nYearAgo })
    .endOf('year')
    .toISODate();
  return [firstDateInNYearAgo, lastDateInNYearAgo];
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

export const formatDate = (checkedDate) => {
  const dateArr = new Date(checkedDate).toDateString().split(' ');
  const dateAfterFormat = `${dateArr[2]}-${dateArr[1]}`;
  return dateAfterFormat;
};

export const formatServerDatetime = (datetime) => {
  if (!datetime) return 'N/A';
  const formatDate = new Date(datetime);
  const result = `${formatDate.getDate()}-${
    formatDate.getMonth() + 1
  }-${formatDate.getFullYear()}`;
  return result;
};
