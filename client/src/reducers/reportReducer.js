import { REPORT_SWITCH_REPORT_MODE } from '../constants/reportConstants';

const initialState = {
  reportMode: 'OVERVIEW',
  totalSubSessions: 0,
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_SWITCH_REPORT_MODE:
      if (action.payload === state.reportMode) return state;
      return {
        ...state,
        reportMode: action.payload,
      };

    default:
      return state;
  }
};
