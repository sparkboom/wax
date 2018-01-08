import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from '../reducers';

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

// Configure Middleware
export const sagaMiddleware = createSagaMiddleware();

// Create Store
const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware, thunk)
  )
);

// Export
export default store;
