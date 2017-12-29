import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import config from '../appsettings.json';
import reducers from './reducers';
import { history } from './history';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';
import App from './containers';
import { composeWithDevTools } from 'redux-devtools-extension';

import { injectGlobal } from 'styled-components';

injectGlobal`
  html, body, #app {
    height: 100%;
    background-color: #000;
    overflow: hidden;
    font-family: 'Barlow', Helvetica, Arial, sans-serif;
    font-weight: lighter;
  }
`;

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

window.goTo = path => store.dispatch(push(path));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
