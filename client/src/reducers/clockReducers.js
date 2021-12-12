import {
  CLOCK_TOGGLE_START,
  CLOCK_TOGGLE_MODE,
} from '../constants/clockConstants';

const initialState = {
  isStart: false,
  mode: 'SHORT_BREAK',
};

export const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOCK_TOGGLE_START:
      return {
        ...state,
        isStart: action.payload,
      };
    case CLOCK_TOGGLE_MODE:
      if (action.payload !== state.mode)
        return {
          ...state,
          mode: action.payload,
        };
      return state;
    default:
      return state;
  }
};
