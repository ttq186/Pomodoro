import {
  REPORT_ADD_SESSION,
  REPORT_GET_SESSIONS,
  REPORT_SWITCH_REPORT_MODE,
  REPORT_UPDATE_TOTAL_SUB_SESSIONS,
} from '../constants/reportConstants';

const initialState = {
  reportMode: 'OVERVIEW',
  totalSubSessions: 0,
  sessionList: [],
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

    case REPORT_ADD_SESSION: {
      const newSessionList = [action.payload, ...state.sessionList];
      return {
        ...state,
        sessionList: newSessionList,
      };
    }

    case REPORT_GET_SESSIONS:
      return {
        ...state,
        sessionList: action.payload,
      };

    default:
      return state;

    case REPORT_UPDATE_TOTAL_SUB_SESSIONS:
      return {
        ...state,
        totalSubSessions: state.totalSubSessions + 1,
      };
  }
};
