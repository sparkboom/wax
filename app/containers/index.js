import React from 'react';
import { connect } from 'react-redux';
import { routes, getRoutePathname } from '../routes';
import { Route, Switch, withRouter } from 'react-router-dom';
import Canvas from './canvas';
import styled from 'styled-components';
import tokens from '../style-tokens';
import {backGradient} from '../style-utils';

const Frame = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  color: ${tokens.textColor};
  ${backGradient(tokens)}
`;

class App extends React.Component {

  render() {
    return (
      <Frame>
        <Switch>
          <Route path={'/home'} component={Canvas}/>
        </Switch>
      </Frame>);
  }
}

export default withRouter(connect()(App));
