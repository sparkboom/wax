import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers';
import { injectGlobal } from 'styled-components';
import {theme} from './style/';

import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import { history } from './history';

import store from './store';

window.goTo = path => store.dispatch(push(path));

injectGlobal`
  @import url(${theme.fontUrl});

  html, body, #app {
    height: 100%;
    overflow: hidden;
    background-color: ${theme.bodyColor};
    font-family: ${theme.fontFamily};
    font-weight: 300;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
