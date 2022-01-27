import {
  CLOCK_GET_SUMMARY,
  CLOCK_SWITCH_MODE,
  CLOCK_TOGGLE_START,
  CLOCK_UPDATE_SUMMARY,
  CLOCK_GET_SUMMARY_FAIL,
  CLOCK_UPDATE_TIME_LEFT,
  CLOCK_GET_TIMER_SETTING,
  CLOCK_UPDATE_TIMER_SETTING,
  CLOCK_GET_TIMER_SETTING_FAIL,
} from '../constants/clockConstants';

const initialState = {
  isStart: false,
  mode: 'START_SESSION',
  timeLeft: 10,
  totalSubSessions: 0,
  timerSetting: {
    sessionTime: 10,
    shortBreakTime: 5,
    longBreakTime: 1200,
    longBreakInterval: 4,
    alarmSound: 'Digital',
    tickingSound: 'None',
    lightMode: false,
  },
  summary: {
    totalTime: 0,
    totalSessions: 0,
    totalFinishedTasks: 0,
  },
};

export const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOCK_TOGGLE_START:
      return { ...state, isStart: !state.isStart };

    case CLOCK_SWITCH_MODE: {
      if (action.payload === state.mode) return state;

      return {
        ...state,
        mode: action.payload.mode,
        timeLeft: action.payload.time,
      };
    }

    case CLOCK_UPDATE_TIME_LEFT:
      return { ...state, timeLeft: action.payload };

    case CLOCK_UPDATE_TIMER_SETTING:
      return {
        ...state,
        timerSetting: {
          ...state.timerSetting,
          ...action.payload,
        },
      };

    case CLOCK_UPDATE_SUMMARY:
      return {
        ...state,
        totalSubSessions: state.totalSubSessions + 1,
        summary: { ...action.payload },
      };

    case CLOCK_GET_TIMER_SETTING:
      return {
        ...state,
        timerSetting: action.payload,
      };

    case CLOCK_GET_SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };

    case CLOCK_GET_SUMMARY_FAIL:
      return initialState;

    case CLOCK_GET_TIMER_SETTING_FAIL:
      return initialState;

    default:
      return state;
  }
};
