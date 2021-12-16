import {
  CLOCK_TOGGLE_START,
  CLOCK_SWITCH_MODE,
  CLOCK_UPDATE_TIME_LEFT,
  CLOCK_UPDATE_TIMER_SETTING,
  CLOCK_UPDATE_SUMMARY,
} from '../constants/clockConstants';

const initialState = {
  isStart: false,
  mode: 'START_SESSION',
  timeLeft: -1,
  timerSetting: {
    sessionTime: 10,
    shortBreakTime: 5,
    longBreakTime: 1200,
    longBreakInterval: 4,
    alarmSound: 'Digital',
    tickingSpeed: 'None',
    lightMode: false,
  },
  summary: {
    totalTime: 0,
    totalSessions: 0,
    finishedTasks: 0,
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
        summary: {
          ...state.summary,
          totalTime: state.summary.totalTime + action.payload,
          totalSessions: state.summary.totalSessions + 1,
        },
      };

    default:
      return state;
  }
};
