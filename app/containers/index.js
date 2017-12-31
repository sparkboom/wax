// @flow

import * as React from 'react';
import {routes, getRoutePathname} from '../routes';
import {Route, Switch, withRouter} from 'react-router-dom';
import App from './app';
import {Frame} from './private';
import {themes} from '../style';
import {ThemeProvider} from 'styled-components';

export default withRouter( () => (
  <ThemeProvider theme={themes.wax}>
    <Frame>
      <Switch><Route path={'/home'} component={App}/></Switch>
    </Frame>
  </ThemeProvider>
));
