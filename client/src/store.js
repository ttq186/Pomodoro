import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { clockReducer } from './reducers/clockReducer';
import { taskListReducer } from './reducers/taskListReducer';
import { userReducer } from './reducers/userReducer';
import { summaryReducer } from './reducers/summaryReducer';

const reducer = combineReducers({
  user: userReducer,
  clock: clockReducer,
  taskList: taskListReducer,
  summary: summaryReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
