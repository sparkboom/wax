import React from 'react';
import { connect } from 'react-redux';
import { routes, getRoutePathname } from '../routes';
import { Route, Switch, withRouter } from 'react-router-dom';
import Canvas from './canvas';
import {Frame} from './private';

class App extends React.Component {

  render() {
    return <Frame><Switch><Route path={'/home'} component={Canvas}/></Switch></Frame>
  }
}

export default withRouter(connect()(App));
