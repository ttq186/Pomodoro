import {
  TASKLIST_CHOOSE_TASK,
  TASKLIST_MODIFY_TASK,
  TASKLIST_REMOVE_TASK,
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

export const submitAddTask = (taskInfo) => ({
  type: TASKLIST_SUBMIT_ADD_TASK,
  payload: taskInfo,
});

export const modifyTask = (id) => ({
  type: TASKLIST_MODIFY_TASK,
  payload: id,
});

export const submitModifyTask = (taskInfo) => ({
  type: TASKLIST_SUBMIT_MODIFY_TASK,
  payload: taskInfo,
});

export const cancelModifyTask = () => ({
  type: TASKLIST_CANCEL_MODIFY_TASK,
});

export const updateTaskProgress = () => ({
  type: TASKLIST_UPDATE_TASK_PROGRESS,
});

export const removeTask = (id) => ({
  type: TASKLIST_REMOVE_TASK,
  payload: id,
});

export const updateTaskFinish = (id) => ({
  type: TASKLIST_UPDATE_TASK_FINISH,
  payload: id,
});

export const toggleHasJustFinishedTask = () => ({
  type: TASKLIST_TOGGLE_HAS_JUST_FINISHED_TASK,
});
