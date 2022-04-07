import axios from 'axios';

import {
  SUMMARY_GET_INFO,
  SUMMARY_UPDATE_INFO,
  SUMMARY_GET_INFO_FAILED,
  SUMMARY_SWITCH_REPORT_MODE,
} from '../constants/summaryConstants';
import { getRequestConfig } from '../utils';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const switchReportMode = (mode) => ({
  type: SUMMARY_SWITCH_REPORT_MODE,
  payload: mode,
});

export const getSummary = () => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);
    const { data } = await axios.get(`${BASE_URL}/api/summary/me`, config);
    const { totalTime, totalSessions, totalFinishedTasks } = data;
    dispatch({
      type: SUMMARY_GET_INFO,
      payload: { totalTime, totalSessions, totalFinishedTasks },
    });
  } catch {
    dispatch({ type: SUMMARY_GET_INFO_FAILED });
  }
};

export const updateSummary = (updatedSummary) => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);
    const { data } = await axios.put(
      `${BASE_URL}/api/summary/me`,
      updatedSummary,
      config
    );

    dispatch({
      type: SUMMARY_UPDATE_INFO,
      payload: data,
    });
  } catch {}
};
