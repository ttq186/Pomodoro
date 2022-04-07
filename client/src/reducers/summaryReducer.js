import {
  SUMMARY_GET_INFO,
  SUMMARY_UPDATE_INFO,
  SUMMARY_GET_INFO_FAILED,
  SUMMARY_SWITCH_REPORT_MODE,
} from '../constants/summaryConstants';

const initialState = {
  reportMode: 'OVERVIEW',
  totalSubSessions: 0,
  totalTime: 0,
  totalSessions: 0,
  totalFinishedTasks: 0,
};

export const summaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUMMARY_GET_INFO:
      return {
        ...state,
        ...action.payload,
      };

    case SUMMARY_UPDATE_INFO:
      return {
        ...state,
        ...action.payload,
        totalSubSessions: state.totalSubSessions + 1,
      };

    case SUMMARY_GET_INFO_FAILED:
      return initialState;

    case SUMMARY_SWITCH_REPORT_MODE:
      if (action.payload === state.reportMode) return state;
      return {
        ...state,
        reportMode: action.payload,
      };

    default:
      return state;
  }
};
