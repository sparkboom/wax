import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from '../reducers';

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [
  routerMiddleware(history),
  thunk,
];

const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(
    applyMiddleware(...middleware.filter(Boolean))
  )
);

export default store;
