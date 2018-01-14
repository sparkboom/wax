// @flow

import {throwError} from './actions';
import shortid from 'shortid';

// Code
export const className = 'APP';
export const methods = [{
  className: 'APP',
  methodName: 'throwerror',
  action: throwError(new Error('This is a test error')),
  key: shortid.generate(),
}];
