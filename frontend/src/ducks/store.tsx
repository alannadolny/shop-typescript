import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import { createMiddleware } from 'redux-api-middleware';
import { userReducer } from './users/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const combinedReducers = combineReducers({
  user: userReducer,
});

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk, createMiddleware(), logger))
);

export type RootReducers = ReturnType<typeof combinedReducers>;

export default store;
