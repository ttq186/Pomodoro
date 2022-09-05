import {
  REPORT_SWITCH_REPORT_MODE,
  REPORT_GET_SESSIONS_IN_PERIOD,
  REPORT_UPDATE_TOTAL_SUB_SESSIONS,
} from '../constants/reportConstants';
import { USER_ADD_SESSION } from '../constants/userConstants';
import { apiClient } from '../apiClient';

export const switchReportMode = (mode) => ({
  type: REPORT_SWITCH_REPORT_MODE,
  payload: mode,
});

export const updateTotalSubSessions = () => ({
  type: REPORT_UPDATE_TOTAL_SUB_SESSIONS,
});

export const addSession = (newSessionInfo) => async (dispatch) => {
  try {
    const { data } = await apiClient.post('/sessions', newSessionInfo);
    dispatch({
      type: USER_ADD_SESSION,
      payload: data,
    });
  } catch {}
};

export const getSessionsInPeriod = (fromDate, toDate) => async (dispatch) => {
  try {
    const { data } = await apiClient.get(
      `/sessions?from_date=${fromDate}&to_date=${toDate}`
    );
    dispatch({
      type: REPORT_GET_SESSIONS_IN_PERIOD,
      payload: data,
    });
  } catch {}
};
