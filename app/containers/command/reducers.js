// @flow

import * as ActionTypes from './action-types';
import * as Actions from './actions';
import * as Types from './types';
import remove from 'lodash/remove';
import * as State from './state';

// Types
type CommandReducer = (typeof State, Actions.Union) => typeof State;

// Code

const commandReducer:CommandReducer = (state = State.default, action) => {
  switch (action.type) {
    case ActionTypes.SetTokens:
      return {
        tokens: action.tokens
      };
    case ActionTypes.FilterTokens:
      let tokens = [...state.tokens];
      remove(tokens, action.match);
      return {
        tokens
      };
    default:
      (action: empty);
      return state;
  }
};
export default commandReducer;
