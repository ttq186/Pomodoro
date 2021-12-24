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

export const updateTaskProgress = () => ({
  type: TASKLIST_UPDATE_TASK_PROGRESS,
});

export const updateTaskFinish = (id) => ({
  type: TASKLIST_UPDATE_TASK_FINISH,
  payload: id,
});

export const toggleHasJustFinishedTask = () => ({
  type: TASKLIST_TOGGLE_HAS_JUST_FINISHED_TASK,
});

export const submitAddTask = (taskInfo) => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${userInfo.access_token}`,
      },
    };

    const { data } = await axios.post(
      'http://127.0.0.1:8000/api/tasks/',
      taskInfo,
      config
    );
    const newTask = {
      id: data.id,
      title: data.title,
      notes: data.notes,
      progress: data.progress,
      target: data.target,
      isFinished: data.is_finished,
    };
    dispatch({
      type: TASKLIST_SUBMIT_ADD_TASK,
      payload: newTask,
    });
  } catch {}
};

export const submitModifyTask = (taskInfo) => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${userInfo.access_token}`,
      },
    };

    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/tasks/${taskInfo.id}`,
      taskInfo,
      config
    );
    const newTask = {
      title: data.title,
      notes: data.notes,
      progress: data.progress,
      target: data.target,
      isFinished: data.is_finished,
    };
    dispatch({
      type: TASKLIST_SUBMIT_MODIFY_TASK,
      payload: newTask,
    });
  } catch {}
};

export const removeTask = (id) => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${userInfo.access_token}`,
      },
    };

    await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`, config);
    dispatch({
      type: TASKLIST_REMOVE_TASK,
      payload: id,
    });
  } catch {}
};

export const getTasksFromServer = () => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${userInfo.access_token}`,
      },
    };

    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/tasks/',
      config
    );
    dispatch({ type: TASKLIST_GET_DATA, payload: data });
  } catch {
    dispatch({ type: TASKLIST_GET_DATA_FAIL });
  }
};
