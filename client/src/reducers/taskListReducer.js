import {
  TASKLIST_GET_DATA,
  TASKLIST_CHOOSE_TASK,
  TASKLIST_MODIFY_TASK,
  TASKLIST_REMOVE_TASK,
  TASKLIST_GET_DATA_FAIL,
  TASKLIST_UNCHOOSE_TASK,
  TASKLIST_SUBMIT_ADD_TASK,
  TASKLIST_TOGGLE_ADD_TASK,
  TASKLIST_UPDATE_TASK_FINISH,
  TASKLIST_CANCEL_MODIFY_TASK,
  TASKLIST_SUBMIT_MODIFY_TASK,
  TASKLIST_UPDATE_TASK_PROGRESS,
  TASKLIST_TOGGLE_HAS_JUST_FINISHED_TASK,
} from '../constants/taskListConstants';

const initialState = {
  isAddTask: false,
  hasChoseTask: false,
  isModifyTask: false,
  hasJustFinishedTask: false,
  tasks: [],
  modifiedTask: null,
};

export const taskListReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKLIST_TOGGLE_ADD_TASK:
      return { ...state, isAddTask: !state.isAddTask };

    case TASKLIST_CHOOSE_TASK: {
      const newTasks = state.tasks.map((item) => {
        return item.id !== action.payload
          ? { ...item, isDisabled: true }
          : item;
      });

      return { ...state, hasChoseTask: true, tasks: newTasks };
    }

    case TASKLIST_UNCHOOSE_TASK: {
      const newTasks = state.tasks.map((item) => ({
        ...item,
        isDisabled: false,
        isChecked: false,
      }));

      return { ...state, hasChoseTask: false, tasks: newTasks };
    }

    case TASKLIST_SUBMIT_ADD_TASK: {
      const newTasks = [action.payload, ...state.tasks];
      return { ...state, tasks: newTasks };
    }

    case TASKLIST_MODIFY_TASK: {
      const modifiedTask = state.tasks.find(
        (item) => item.id === action.payload
      );

      return { ...state, isModifyTask: true, modifiedTask };
    }

    case TASKLIST_SUBMIT_MODIFY_TASK: {
      const newTasks = [
        { ...state.modifiedTask, ...action.payload },
        ...state.tasks.filter((item) => item.id !== state.modifiedTask.id),
      ];

      return { ...state, modifiedTask: null, tasks: newTasks };
    }

    case TASKLIST_CANCEL_MODIFY_TASK:
      return { ...state, modifiedTask: null };

    case TASKLIST_UPDATE_TASK_PROGRESS: {
      const choseTask = state.tasks.find((item) => !item.isDisabled);
      const updatedChoseTask = {
        ...choseTask,
        progress: choseTask.progress + 1,
      };

      const disabledTaskList = state.tasks.filter((item) => item.isDisabled);
      return { ...state, tasks: [updatedChoseTask, ...disabledTaskList] };
    }

    case TASKLIST_UPDATE_TASK_FINISH: {
      const justFinishedTask = state.tasks.find(
        (item) => item.id === action.payload
      );
      justFinishedTask.isFinished = true;
      const otherTasks = state.tasks.filter(
        (item) => item.id !== action.payload
      );

      return { ...state, tasks: [justFinishedTask, ...otherTasks] };
    }

    case TASKLIST_REMOVE_TASK: {
      const newTasks = state.tasks.filter((item) => item.id !== action.payload);
      return { ...state, tasks: newTasks };
    }

    case TASKLIST_TOGGLE_HAS_JUST_FINISHED_TASK:
      return { ...state, hasJustFinishedTask: !state.hasJustFinishedTask };

    case TASKLIST_GET_DATA:
      return { ...state, tasks: action.payload };

    case TASKLIST_GET_DATA_FAIL:
      return initialState;

    default:
      return state;
  }
};
