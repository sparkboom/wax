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
        ...state,
        tokens: action.tokens,
      };

    case ActionTypes.FilterTokens:
      let tokens = [...state.tokens];
      remove(tokens, action.match);
      return {
        ...state,
        tokens,
      };
    case ActionTypes.RegisterMethods:

      let newMethods = action.methods.reduce((acc, cur) => { acc[cur.key]=cur; return acc; }, {});
      let currentClass = state.classes[action.className] || {};

      return {
        ...state,
        classes: {
          ...state.classes,
          [action.className]:{
            methodKeys: [
              ...(currentClass.methodKeys || []), 
              action.methods.map(m => m.key)],
        }},
        methods: {
          ...state.methods,
          ...newMethods,
        }
      }

    case ActionTypes.DeregisterMethods:
      return state;

    default:
      (action: empty);
      return state;
  }
};
export default commandReducer;
