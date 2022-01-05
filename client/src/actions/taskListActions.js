import axios from 'axios';

import {
  TASKLIST_GET_DATA,
  TASKLIST_CHOOSE_TASK,
  TASKLIST_MODIFY_TASK,
  TASKLIST_REMOVE_TASK,
  TASKLIST_GET_DATA_FAIL,
  TASKLIST_UNCHOOSE_TASK,
  TASKLIST_TOGGLE_ADD_TASK,
  TASKLIST_SUBMIT_ADD_TASK,
  TASKLIST_UPDATE_TASK_FINISH,
  TASKLIST_CANCEL_MODIFY_TASK,
  TASKLIST_SUBMIT_MODIFY_TASK,
  TASKLIST_UPDATE_TASK_PROGRESS,
  TASKLIST_TOGGLE_HAS_JUST_FINISHED_TASK,
} from '../constants/taskListConstants';
import { getRequestConfig } from '../utils';

export const toggleAddTask = () => ({
  type: TASKLIST_TOGGLE_ADD_TASK,
});

export const chooseTask = (id) => ({
  type: TASKLIST_CHOOSE_TASK,
  payload: id,
});

export const unChooseTask = () => ({
  type: TASKLIST_UNCHOOSE_TASK,
});

export const modifyTask = (id) => ({
  type: TASKLIST_MODIFY_TASK,
  payload: id,
});

export const cancelModifyTask = () => ({
  type: TASKLIST_CANCEL_MODIFY_TASK,
});

export const toggleHasJustFinishedTask = () => ({
  type: TASKLIST_TOGGLE_HAS_JUST_FINISHED_TASK,
});

export const submitAddTask = (taskInfo) => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);

    const { data } = await axios.post(
      'http://localhost:8000/api/tasks/',
      taskInfo,
      config
    );

    dispatch({
      type: TASKLIST_SUBMIT_ADD_TASK,
      payload: data,
    });
  } catch {}
};

export const submitModifyTask = (taskInfo) => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);

    const { data } = await axios.put(
      `http://localhost:8000/api/tasks/${taskInfo.id}`,
      {...taskInfo, isFinished: false},
      config
    );
    dispatch({
      type: TASKLIST_SUBMIT_MODIFY_TASK,
      payload: data,
    });
  } catch {}
};

export const removeTask = (id) => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);

    await axios.delete(`http://localhost:8000/api/tasks/${id}`, config);
    dispatch({
      type: TASKLIST_REMOVE_TASK,
      payload: id,
    });
  } catch {}
};

export const getTasksFromServer = () => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);

    const { data } = await axios.get(
      'http://localhost:8000/api/tasks/',
      config
    );
    dispatch({ type: TASKLIST_GET_DATA, payload: data });
  } catch {
    dispatch({ type: TASKLIST_GET_DATA_FAIL });
  }
};

export const updateTaskProgress =
  (taskId, currentProgress) => async (dispatch) => {
    try {
      const tokenData = JSON.parse(localStorage.getItem('tokenData'));
      const config = getRequestConfig(tokenData.accessToken);

      const { data } = await axios.put(
        `http://localhost:8000/api/tasks/${taskId}`,
        { progress: currentProgress + 1 },
        config
      );
      dispatch({ type: TASKLIST_UPDATE_TASK_PROGRESS, payload: data });
    } catch {}
  };

export const updateTaskFinish = (taskId) => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);

    const { data } = await axios.put(
      `http://localhost:8000/api/tasks/${taskId}`,
      { isFinished: true },
      config
    );
    dispatch({
      type: TASKLIST_UPDATE_TASK_FINISH,
      payload: data,
    });
  } catch {}
};
