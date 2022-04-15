import { DateTime } from 'luxon';
import { isInNWeekAgo, isInNYearAgo, formatDate } from './timeUtils';

export const classifySessionsByDayInNWeekAgo = (sessionList, nWeekAgo) => {
  const sessionsInNWeekAgo = sessionList.filter((session) =>
    isInNWeekAgo(session.finishedAt, nWeekAgo)
  );
  let sessionsByDayInNWeekAgo = Array(7)
    .fill()
    .map(() => ({
      date: null,
      totalTime: 0,
    }));
  const firstDayInNWeekAgo = DateTime.local()
    .startOf('week')
    .minus({ days: nWeekAgo * 7 });

  sessionsInNWeekAgo.forEach((session) => {
    const finishedDate = new Date(session.finishedAt);
    sessionsByDayInNWeekAgo[finishedDate.getDay()].totalTime += session.length;
  });

  sessionsByDayInNWeekAgo.forEach((sessionsByDate, index) => {
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
  return sessionsByDayInNWeekAgo;
};

export const classifySessionsByMonthInNYearAgo = (sessionList, nYearAgo) => {
  const sessionsInNYearAgo = sessionList.filter((session) =>
    isInNYearAgo(session.finishedAt, nYearAgo)
  );
  let sessionsByMonthInNYearAgo = Array(12)
    .fill()
    .map(() => ({
      month: null,
      totalTime: 0,
    }));
  sessionsInNYearAgo.forEach((session) => {
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
