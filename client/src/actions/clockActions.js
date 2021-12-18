import {
  CLOCK_SWITCH_MODE,
  CLOCK_TOGGLE_START,
  CLOCK_UPDATE_SUMMARY,
  CLOCK_UPDATE_TIME_LEFT,
  CLOCK_UPDATE_TIMER_SETTING,
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

export const updateTimerSetting = (timerSetting) => ({
  type: CLOCK_UPDATE_TIMER_SETTING,
  payload: timerSetting,
});
