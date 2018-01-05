import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from '../reducers';

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

// Configure Middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  routerMiddleware(history),
  thunk,
  sagaMiddleware,
];

// Create Store
const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(
    applyMiddleware(...middleware.filter(Boolean))
  )
);

// Startup
function* startupSaga(){
  console.debug('Sagas have started.');
}
sagaMiddleware.run(startupSaga)

// Export
export default store;
