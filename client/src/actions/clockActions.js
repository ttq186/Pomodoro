import axios from 'axios';

import {
  CLOCK_SWITCH_MODE,
  CLOCK_TOGGLE_START,
  CLOCK_UPDATE_TIME_LEFT,
  CLOCK_GET_TIMER_SETTING,
  CLOCK_UPDATE_TIMER_SETTING,
  CLOCK_GET_TIMER_SETTING_FAIL,
} from '../constants/clockConstants';
import { getRequestConfig } from '../utils/serverUtils';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const switchClockMode = ({ mode, time }) => ({
  type: CLOCK_SWITCH_MODE,
  payload: { mode, time },
});

export const toggleClockStart = () => ({
  type: CLOCK_TOGGLE_START,
});

export const updateTimeLeft = (timeLeft) => ({
  type: CLOCK_UPDATE_TIME_LEFT,
  payload: timeLeft,
});

export const updateTimerSetting = (timerSetting) => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);
    const { data } = await axios.put(
      `${BASE_URL}/api/timers/me`,
      timerSetting,
      config
    );

    dispatch({
      type: CLOCK_UPDATE_TIMER_SETTING,
      payload: data,
    });
  } catch {}
};

export const getTimerSetting = () => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);
    const { data } = await axios.get(`${BASE_URL}/api/timers/me`, config);
    dispatch({ type: CLOCK_GET_TIMER_SETTING, payload: data });
  } catch {
    dispatch({ type: CLOCK_GET_TIMER_SETTING_FAIL });
  }
};
