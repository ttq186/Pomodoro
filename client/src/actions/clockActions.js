import axios from 'axios';

import {
  CLOCK_SWITCH_MODE,
  CLOCK_GET_SUMMARY,
  CLOCK_TOGGLE_START,
  CLOCK_UPDATE_SUMMARY,
  CLOCK_GET_SUMMARY_FAIL,
  CLOCK_UPDATE_TIME_LEFT,
  CLOCK_GET_TIMER_SETTING,
  CLOCK_UPDATE_TIMER_SETTING,
  CLOCK_GET_TIMER_SETTING_FAIL,
  CLOCK_UPDATE_TOTAL_FINISHED_TASK,
} from '../constants/clockConstants';

export const switchClockMode = ({ mode, time }) => ({
  type: CLOCK_SWITCH_MODE,
  payload: { mode, time },
});

export const toggleClockStart = () => ({
  type: CLOCK_TOGGLE_START,
});

export const updateSummary = (sessionTime) => ({
  type: CLOCK_UPDATE_SUMMARY,
  payload: sessionTime,
});

export const updateTimeLeft = (timeLeft) => ({
  type: CLOCK_UPDATE_TIME_LEFT,
  payload: timeLeft,
});

export const updateTotalFinishedTask = () => ({
  type: CLOCK_UPDATE_TOTAL_FINISHED_TASK,
});

export const updateTimerSetting = (timerSetting) => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${userInfo.access_token}`,
      },
    };

    const payload = {
      session_time: timerSetting.sessionTime,
      short_break_time: timerSetting.shortBreakTime,
      long_break_time: timerSetting.longBreakTime,
      long_break_interval: timerSetting.longBreakInterval,
      alarm_sound: timerSetting.alarmSound,
      ticking_sound: timerSetting.tickingSound,
    };
    const { data } = await axios.put(
      'http://127.0.0.1:8000/api/timers/',
      payload,
      config
    );
    const newTimerSetting = {
      sessionTime: data.session_time,
      shortBreakTime: data.short_break_time,
      longBreakTime: data.long_break_time,
      longBreakInterval: data.long_break_interval,
      alarmSound: data.alarm_sound,
      tickingSound: data.ticking_sound,
      lightMode: false,
    };

    dispatch({
      type: CLOCK_UPDATE_TIMER_SETTING,
      payload: newTimerSetting,
    });
  } catch {
    console.log('hehe');
  }
};

export const getTimerSettingFromServer = () => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${userInfo.access_token}`,
      },
    };

    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/timers/',
      config
    );
    const timerSetting = {
      sessionTime: data.session_time,
      shortBreakTime: data.short_break_time,
      longBreakTime: data.long_break_time,
      longBreakInterval: data.long_break_interval,
      alarmSound: data.alarm_sound,
      tickingSound: data.ticking_sound,
      lightMode: false,
    };
    dispatch({ type: CLOCK_GET_TIMER_SETTING, payload: timerSetting });
  } catch {
    dispatch({ type: CLOCK_GET_TIMER_SETTING_FAIL });
  }
};

export const getSummaryFromServer = () => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${userInfo.access_token}`,
      },
    };

    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/summary/',
      config
    );
    const summary = {
      totalTime: data.total_time,
      totalSessions: data.total_sessions,
      finishedTasks: data.total_finished_tasks,
    };
    dispatch({ type: CLOCK_GET_SUMMARY, payload: summary });
  } catch {
    dispatch({ type: CLOCK_GET_SUMMARY_FAIL });
  }
};
