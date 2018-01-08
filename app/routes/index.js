import {some, mapValues} from 'lodash';
import routes from './routes';

export {routes};

export const getRoutePathname = route => route.location.pathname;

const containsPath = (list, pathname) => some(list, o => o.location.pathname === pathname);

export const isValidPathnameOfRoute = pathname => containsPath(routes, pathname);
