import createBrowserHistory from 'history/createBrowserHistory';
import deepExtend from 'deep-extend';
import { push } from 'react-router-redux';

export const history = createBrowserHistory();

export const navigateTo = ({ location }) => push(deepExtend(history.location, location));
