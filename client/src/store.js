import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { clockReducer } from './reducers/clockReducers';
import { taskListReducer } from './reducers/taskListReducers';


const reducer = combineReducers({
  clock: clockReducer,
  taskList: taskListReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
