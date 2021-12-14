import {
  TASKLIST_ADD_TASK_TOGGLE,
  TASKLIST_CHOOSE_TASK,
  TASKLIST_UNCHOOSE_TASK,
  TASKLIST_ADD_TASK_SUBMIT,
  TASKLIST_MODIFY_TASK,
  TASKLIST_MODIFY_TASK_SUBMIT,
  TASKLIST_MODIFY_TASK_CANCEL,
} from '../constants/taskListConstants';

const initialState = {
  isAddTask: false,
  hasChoseTask: false,
  isModifyTask: false,
  tasks: [
    {
      id: 1,
      title: 'Coding pomodoro app',
      notes: 'Hoan thanh project nay trong 2 tuan nua',
      isDisabled: false,
      progress: 13,
      target: 20,
    },
    {
      id: 2,
      title: 'Coding pomodoro app',
      notes: '',
      isDisabled: false,
      progress: 3,
      target: 7,
    },
    {
      id: 3,
      title: 'On lai docker',
      notes: 'On lai docker trong 2 ngay',
      isDisabled: false,
      progress: 8,
      target: 14,
    },
    {
      id: 4,
      title: 'Coding pomodoro app',
      notes: 'Hoc cho xong postgresql',
      isDisabled: false,
      progress: 14,
      target: 21,
    },
    {
      id: 5,
      title: 'Coding pomodoro app',
      notes: '',
      isDisabled: false,
      progress: 3,
      target: 7,
    },
    {
      id: 6,
      title: 'Coding pomodoro app',
      notes: '',
      isDisabled: false,
      progress: 5,
      target: 9,
    },
  ],
  modifiedTask: null,
};

export const taskListReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKLIST_ADD_TASK_TOGGLE:
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

    case TASKLIST_ADD_TASK_SUBMIT: {
      const newTask = {
        id: state.tasks.length + 1,
        ...action.payload,
        isDisabled: false,
        progress: 0,
      };

      const newTasks = [newTask, ...state.tasks];
      console.log(newTasks);
      return { ...state, tasks: newTasks };
    }

    case TASKLIST_MODIFY_TASK: {
      const modifiedTask = state.tasks.find(
        (item) => item.id === action.payload
      );

      return { ...state, isModifyTask: true, modifiedTask };
    }

    case TASKLIST_MODIFY_TASK_SUBMIT: {
      const newTasks = [
        { ...state.modifiedTask, ...action.payload },
        ...state.tasks.filter((item) => item.id !== state.modifiedTask.id),
      ];
      console.log(newTasks);
      return { ...state, modifiedTask: null, tasks: newTasks };
    }

    case TASKLIST_MODIFY_TASK_CANCEL:
      return { ...state, modifiedTask: null };

    default:
      return state;
  }
};
