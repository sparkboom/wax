// @flow

import * as ActionTypes from './action-types';
import * as Actions from './actions';
import * as State from './state';
import * as Types from './types';

// Types
type AppReducer = (typeof State, Actions.Union) => typeof State;

// Code

const appReducer:AppReducer = (state = State.default, action) => {
  switch (action.type) {
    case ActionTypes.ExecuteCommand:
    case ActionTypes.GlobalError:
    case ActionTypes.ThrowError:
      return state;
    default:
      (action: empty);
      return state;
  }
};

export default appReducer;
