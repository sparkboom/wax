import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './containers';
import { injectGlobal } from 'styled-components';
import {theme} from './style/';

import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import { history } from './history';

import rootSaga from './sagas';
import store, {sagaMiddleware} from './store';

sagaMiddleware.run(rootSaga);

window.goTo = path => store.dispatch(push(path));
// window.onerror = (msg, url, line, col, error) => {
//   store.dispatch({type:'GLOBAL:ERROR', msg, url, line, col, error});
// };
window.addEventListener('error', event => {
  store.dispatch({type:'GLOBAL:ERROR', message: event.message ,error: event.error});
  event.preventDefault();
})

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
