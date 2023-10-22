
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const rootReducer = combineReducers({
  // Add other reducers if needed
  app: reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
