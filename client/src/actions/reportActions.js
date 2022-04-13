import axios from 'axios';

import {
  REPORT_ADD_SESSION,
  REPORT_GET_SESSIONS,
  REPORT_SWITCH_REPORT_MODE,
  REPORT_UPDATE_TOTAL_SUB_SESSIONS,
} from '../constants/reportConstants';
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
      `${BASE_URL}/api/sessions/`,
      newSessionInfo,
      config
    );
    dispatch({
      type: REPORT_ADD_SESSION,
      payload: data,
    });
  } catch {}
};

export const getSessions = () => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);

    const { data } = await axios.get(`${BASE_URL}/api/sessions/`, config);
    dispatch({
      type: REPORT_GET_SESSIONS,
      payload: data,
    });
  } catch {}
};
