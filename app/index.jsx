import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers';
import { injectGlobal } from 'styled-components';

import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import { history } from './history';

import store from './store';

window.goTo = path => store.dispatch(push(path));

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:100,300');

  html, body, #app {
    height: 100%;
    background-color: #000;
    overflow: hidden;
    font-family: 'Montserrat', sans-serif;
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
