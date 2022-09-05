import {
  CLOCK_SWITCH_MODE,
  CLOCK_TOGGLE_START,
  CLOCK_UPDATE_TIME_LEFT,
  CLOCK_GET_TIMER_SETTING,
  CLOCK_UPDATE_TIMER_SETTING,
  CLOCK_GET_TIMER_SETTING_FAIL,
} from '../constants/clockConstants';
import { apiClient } from '../apiClient';

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
    const { data } = await apiClient.put('/timers/me', timerSetting);

    dispatch({
      type: CLOCK_UPDATE_TIMER_SETTING,
      payload: data,
    });
  } catch {}
};

export const getTimerSetting = () => async (dispatch) => {
  try {
    const { data } = await apiClient.get('/timers/me');
    dispatch({ type: CLOCK_GET_TIMER_SETTING, payload: data });
  } catch {
    dispatch({ type: CLOCK_GET_TIMER_SETTING_FAIL });
  }
};
