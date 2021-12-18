import {
  TASKLIST_CHOOSE_TASK,
  TASKLIST_MODIFY_TASK,
  TASKLIST_REMOVE_TASK,
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
  tasks: [
    {
      id: 1,
      title: 'Coding pomodoro app',
      notes: 'Hoan thanh project nay trong 2 tuan nua',
      isDisabled: false,
      isFinished: false,
      progress: 13,
      target: 20,
    },
    {
      id: 2,
      title: 'Coding pomodoro app',
      notes: '',
      isDisabled: false,
      isFinished: false,
      progress: 3,
      target: 7,
    },
    {
      id: 3,
      title: 'On lai docker',
      notes: 'On lai docker trong 2 ngay',
      isDisabled: false,
      isFinished: false,
      progress: 8,
      target: 14,
    },
    {
      id: 4,
      title: 'Coding pomodoro app',
      notes: 'Hoc cho xong postgresql',
      isDisabled: false,
      isFinished: false,
      progress: 14,
      target: 21,
    },
    {
      id: 5,
      title: 'Coding pomodoro app',
      notes: '',
      isDisabled: false,
      isFinished: false,
      progress: 3,
      target: 7,
    },
    {
      id: 6,
      title: 'Coding pomodoro app',
      notes: '',
      isDisabled: false,
      isFinished: false,
      progress: 5,
      target: 9,
    },
  ],
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
      const newTask = {
        id: state.tasks.length + 1,
        ...action.payload,
        isDisabled: false,
        isFinished: false,
        progress: 0,
      };

      const newTasks = [newTask, ...state.tasks];
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
      const otherTasks = state.tasks.filter((item) => item.id !== action.payload);

      return { ...state, tasks: [justFinishedTask, ...otherTasks] };
    }

    case TASKLIST_REMOVE_TASK: {
      const newTasks = state.tasks.filter((item) => item.id !== action.payload);
      return { ...state, tasks: newTasks };
    }

    case TASKLIST_TOGGLE_HAS_JUST_FINISHED_TASK:
      return { ...state, hasJustFinishedTask: !state.hasJustFinishedTask };

    default:
      return state;
  }
};
