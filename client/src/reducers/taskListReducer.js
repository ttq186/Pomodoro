import {
  TASKLIST_GET_DATA,
  TASKLIST_CHOOSE_TASK,
  TASKLIST_MODIFY_TASK,
  TASKLIST_REMOVE_TASK,
  TASKLIST_GET_DATA_FAIL,
  TASKLIST_UNCHOOSE_TASK,
  TASKLIST_SUBMIT_ADD_TASK,
  TASKLIST_TOGGLE_ADD_TASK,
  TASKLIST_CANCEL_MODIFY_TASK,
  TASKLIST_SUBMIT_MODIFY_TASK,
  TASKLIST_UPDATE_TASK_PROGRESS,
  TASKLIST_TOGGLE_HAS_JUST_FINISHED_TASK,
} from '../constants/taskListConstants';

const initialState = {
  isAddTask: false,
  choseTask: null,
  isModifyTask: false,
  hasJustFinishedTask: false,
  tasks: [],
  finishedTasksWithPage: [],
  modifiedTask: null,
};

export const taskListReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKLIST_TOGGLE_ADD_TASK:
      return { ...state, isAddTask: !state.isAddTask };

    case TASKLIST_CHOOSE_TASK: {
      const choseTask = state.tasks.find((item) => item.id === action.payload);
      const newTasks = state.tasks.map((item) => {
        return item.id !== action.payload
          ? { ...item, isDisabled: true }
          : item;
      });

      return {
        ...state,
        choseTask,
        tasks: newTasks,
      };
    }

    case TASKLIST_UNCHOOSE_TASK: {
      const newTasks = state.tasks.map((item) => ({
        ...item,
        isDisabled: false,
      }));

      return {
        ...state,
        choseTask: null,
        tasks: newTasks,
      };
    }

    case TASKLIST_SUBMIT_ADD_TASK: {
      const newTasks = [action.payload, ...state.tasks];
      return { ...state, tasks: newTasks };
    }

    case TASKLIST_MODIFY_TASK: {
      const modifiedTask = state.tasks.find(
        (item) => item.id === action.payload
      );

      return {
        ...state,
        isModifyTask: true,
        modifiedTask: { ...modifiedTask, isFinished: false },
      };
    }

    case TASKLIST_SUBMIT_MODIFY_TASK: {
      const newTasks = [
        { ...state.modifiedTask, ...action.payload },
        ...state.tasks.filter((item) => item.id !== action.payload.id),
      ];

      return { ...state, modifiedTask: null, tasks: newTasks };
    }

    case TASKLIST_CANCEL_MODIFY_TASK:
      return { ...state, modifiedTask: null };

    case TASKLIST_UPDATE_TASK_PROGRESS: {
      const updatedChoseTask = action.payload;
      const newChoseTask =
        updatedChoseTask.progress !== updatedChoseTask.target
          ? updatedChoseTask
          : null;
      const otherTasks = state.tasks.filter(
        (item) => item.id !== updatedChoseTask.id
      );
      return {
        ...state,
        choseTask: newChoseTask,
        tasks: [updatedChoseTask, ...otherTasks],
      };
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
