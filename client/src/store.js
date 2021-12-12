import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { clockReducer } from './reducers/clockReducers';


const reducer = combineReducers({
  clock: clockReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
