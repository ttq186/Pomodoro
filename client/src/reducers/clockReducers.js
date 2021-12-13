import {
  CLOCK_TOGGLE_START,
  CLOCK_TOGGLE_MODE,
  CLOCK_UPDATE_TIME_LEFT,
} from '../constants/clockConstants';

const initialState = {
  isStart: false,
  mode: 'SHORT_BREAK',
  timeLeft: '10',
};

export const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOCK_TOGGLE_START:
      return { ...state, isStart: !state.isStart };

    case CLOCK_TOGGLE_MODE:
      if (action.payload !== state.mode)
        return { ...state, mode: action.payload };
      return state;

    case CLOCK_UPDATE_TIME_LEFT:
      return { ...state, timeLeft: action.payload };

    default:
      return state;
  }
};
