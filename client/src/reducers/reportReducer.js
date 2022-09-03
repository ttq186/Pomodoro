import {
  REPORT_SWITCH_REPORT_MODE,
  REPORT_GET_SESSIONS_IN_PERIOD,
  REPORT_UPDATE_TOTAL_SUB_SESSIONS,
} from '../constants/reportConstants';

const initialState = {
  reportMode: 'OVERVIEW',
  totalSubSessions: 0,
  sessionsInPeriod: [],
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_SWITCH_REPORT_MODE: {
      if (action.payload === state.reportMode) return state;
      return {
        ...state,
        reportMode: action.payload,
      };
    }

    case REPORT_GET_SESSIONS_IN_PERIOD:
      return {
        ...state,
        sessionsInPeriod: action.payload,
      };

    case REPORT_UPDATE_TOTAL_SUB_SESSIONS:
      return {
        ...state,
        totalSubSessions: state.totalSubSessions + 1,
      };

    default:
      return state;
  }
};
