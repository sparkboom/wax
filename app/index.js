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

window.onerror = function(message, file, line, col, error) {
  console.log('window.onerror', {message, file, line, col, error, event: window.event});
  if(error != null)
  {
      //handle the error with stacktrace in error.stack
  } else {
      //sadly only 'message', 'filename' and 'lineno' work here
      store.dispatch({type:'GLOBAL:ERROR', message: event.message || '',error: event.error});
  }
  //store.dispatch({type:'GLOBAL:ERROR', message: message || '' ,error});
};

try{
  sagaMiddleware.run(rootSaga);

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
}
catch(globalErr){
  console.log('globalErr', globalErr);
}
