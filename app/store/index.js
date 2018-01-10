import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from '../reducers';

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

let store = null;

// Configure Middleware
export const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: {
    effectTriggered: (...args) => console.debug('effectTriggered', ...args),
    effectResolved: (...args) => console.debug('effectResolved', ...args),
    effectRejected: (...args) => console.debug('effectRejected', ...args),
    effectCancelled: (...args) => console.debug('effectCancelled', ...args),
    actionDispatched: (...args) => console.debug('actionDispatched', ...args),
  },
  onError: (error) => {
    console.error('saga onError', error);
    //store && store.dispatch({type:'GLOBAL:ERROR', message: error.message, error});
  }
});

// Create Store
store = createStore(
  combineReducers(reducers),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware, thunk)
  )
);

// Export
export default store;
