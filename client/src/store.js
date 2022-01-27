import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { clockReducer } from './reducers/clockReducer';
import { taskListReducer } from './reducers/taskListReducer';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
  clock: clockReducer,
  taskList: taskListReducer,
  user: userReducer,
});


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
