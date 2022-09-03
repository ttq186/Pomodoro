import axios from 'axios';

import {
  REPORT_SWITCH_REPORT_MODE,
  REPORT_GET_SESSIONS_IN_PERIOD,
  REPORT_UPDATE_TOTAL_SUB_SESSIONS,
} from '../constants/reportConstants';
import { USER_ADD_SESSION } from '../constants/userConstants';
import { getRequestConfig } from '../utils/serverUtils';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const switchReportMode = (mode) => ({
  type: REPORT_SWITCH_REPORT_MODE,
  payload: mode,
});

export const updateTotalSubSessions = () => ({
  type: REPORT_UPDATE_TOTAL_SUB_SESSIONS,
});

export const addSession = (newSessionInfo) => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);

    const { data } = await axios.post(
      `${BASE_URL}/api/sessions`,
      newSessionInfo,
      config
    );
    dispatch({
      type: USER_ADD_SESSION,
      payload: data,
    });
  } catch {}
};

export const getSessionsInPeriod = (fromDate, toDate) => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);

    const { data } = await axios.get(
      `${BASE_URL}/api/sessions?from_date=${fromDate}&to_date=${toDate}`,
      config
    );
    dispatch({
      type: REPORT_GET_SESSIONS_IN_PERIOD,
      payload: data,
    });
  } catch {}
};
