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
import { getRequestConfig } from '../utils';

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
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);
    const { data } = await axios.put(
      'http://localhost:8000/api/timers/',
      timerSetting,
      config
    );

    dispatch({
      type: CLOCK_UPDATE_TIMER_SETTING,
      payload: data,
    });
  } catch {}
};

export const getTimerSettingFromServer = () => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);
    const { data } = await axios.get(
      'http://localhost:8000/api/timers/',
      config
    );
    dispatch({ type: CLOCK_GET_TIMER_SETTING, payload: data });
  } catch {
    dispatch({ type: CLOCK_GET_TIMER_SETTING_FAIL });
  }
};

export const getSummaryFromServer = () => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);
    const { data } = await axios.get(
      'http://localhost:8000/api/summary/',
      config
    );
    const { totalTime, totalSessions, totalFinishedTasks } = data;
    dispatch({
      type: CLOCK_GET_SUMMARY,
      payload: { totalTime, totalSessions, totalFinishedTasks },
    });
  } catch {
    dispatch({ type: CLOCK_GET_SUMMARY_FAIL });
  }
};
