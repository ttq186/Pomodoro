import {
  TASKLIST_GET_DATA,
  TASKLIST_CHOOSE_TASK,
  TASKLIST_MODIFY_TASK,
  TASKLIST_REMOVE_TASK,
  TASKLIST_GET_DATA_FAIL,
  TASKLIST_UNCHOOSE_TASK,
  TASKLIST_TOGGLE_ADD_TASK,
  TASKLIST_SUBMIT_ADD_TASK,
  TASKLIST_CANCEL_MODIFY_TASK,
  TASKLIST_SUBMIT_MODIFY_TASK,
  TASKLIST_UPDATE_TASK_PROGRESS,
  TASKLIST_TOGGLE_HAS_JUST_FINISHED_TASK,
} from '../constants/taskListConstants';
import { apiClient } from '../apiClient';

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
    const { data } = await apiClient.post('/tasks', taskInfo);
    dispatch({
      type: TASKLIST_SUBMIT_ADD_TASK,
      payload: data,
    });
  } catch {}
};

export const submitModifyTask = (taskInfo) => async (dispatch) => {
  try {
    const { data } = await apiClient.put(`/tasks/${taskInfo.id}`, {
      ...taskInfo,
      isFinished: false,
    });
    dispatch({
      type: TASKLIST_SUBMIT_MODIFY_TASK,
      payload: data,
    });
  } catch {}
};

export const removeTask = (id) => async (dispatch) => {
  try {
    await apiClient.delete(`/tasks/${id}`);
    dispatch({
      type: TASKLIST_REMOVE_TASK,
      payload: id,
    });
  } catch {}
};

export const getTasks = () => async (dispatch) => {
  try {
    const { data } = await apiClient.get('/tasks');
    dispatch({ type: TASKLIST_GET_DATA, payload: data });
  } catch {
    dispatch({ type: TASKLIST_GET_DATA_FAIL });
  }
};

export const updateTaskProgress = (taskId, payload) => async (dispatch) => {
  try {
    const { data } = await apiClient.put(`/tasks/${taskId}`, payload);
    dispatch({ type: TASKLIST_UPDATE_TASK_PROGRESS, payload: data });
  } catch {}
};
