import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { clockReducer } from './reducers/clockReducer';
import { taskListReducer } from './reducers/taskListReducer';
import { userReducer } from './reducers/userReducer';
import { reportReducer } from './reducers/reportReducer';

const reducer = combineReducers({
  user: userReducer,
  clock: clockReducer,
  taskList: taskListReducer,
  report: reportReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
