import { TASKLIST_ADD_TASK } from '../constants/taskListConstants';

const initialState = {
  isAddTask: false,
};

export const taskListReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKLIST_ADD_TASK:
      return { ...state, isAddTask: !state.isAddTask };
    default:
      return state;
  }
};
