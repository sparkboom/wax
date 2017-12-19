import React from 'react';
import {connect} from 'react-redux';
import {routes, getRoutePathname} from '../routes';
import {Route, Switch, withRouter} from 'react-router-dom';
import Canvas from './canvas';
import {Frame} from './private';
import {themes} from '../style';
import {ThemeProvider} from 'styled-components';

class App extends React.Component {

  render() {
    return <ThemeProvider theme={themes.wax}><Frame><Switch><Route path={'/home'} component={Canvas}/></Switch></Frame></ThemeProvider>
  }
}

export default withRouter(connect()(App));
