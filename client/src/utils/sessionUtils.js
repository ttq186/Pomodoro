import { DateTime } from 'luxon';
import { formatDate } from './timeUtils';

export const classifySessionsByDayInNWeekAgo = (sessions, nWeekAgo) => {
  let sessionsByDateInNWeekAgo = Array(7)
    .fill()
    .map(() => ({
      date: null,
      totalTime: 0,
    }));
  const firstDayInNWeekAgo = DateTime.local()
    .startOf('week')
    .minus({ days: nWeekAgo * 7 });

  sessions.forEach((session) => {
    const finishedDate = new Date(session.finishedAt);
    sessionsByDateInNWeekAgo[finishedDate.getDay()].totalTime += session.length;
  });

  sessionsByDateInNWeekAgo.forEach((sessionsByDate, index) => {
    if (index === 0) {
      sessionsByDate.date = formatDate(
        firstDayInNWeekAgo.plus({ days: index + 6 }).toString()
      );
    } else {
      sessionsByDate.date = formatDate(
        firstDayInNWeekAgo.plus({ days: index - 1 }).toString()
      );
    }
    sessionsByDate.totalTime =
      Math.round((sessionsByDate.totalTime / 3600) * 10) / 10;
  });
  return [...sessionsByDateInNWeekAgo.slice(1), sessionsByDateInNWeekAgo[0]];
};

export const classifySessionsByMonthInNYearAgo = (sessions) => {
  let sessionsByMonthInNYearAgo = Array(12)
    .fill()
    .map(() => ({
      month: null,
      totalTime: 0,
    }));
  sessions.forEach((session) => {
    const finishedDate = new Date(session.finishedAt);
    sessionsByMonthInNYearAgo[finishedDate.getMonth()].totalTime +=
      session.length;
  });
  const january = DateTime.local().startOf('year');

  sessionsByMonthInNYearAgo.forEach((sessionsByMonth, index) => {
    const monthName = january.plus({ months: index }).toFormat('LLL');
    sessionsByMonth.month = monthName;
    sessionsByMonth.totalTime =
      Math.round((sessionsByMonth.totalTime / 3600) * 10) / 10;
  });
  return sessionsByMonthInNYearAgo;
};
