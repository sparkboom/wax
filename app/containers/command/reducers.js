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
    case ActionTypes.LoadApi:

      let newApi = action.api.api;
      let newInterfacesByKey = action.api.interfaces.reduce((acc, cur) => { acc[cur.interfaceKey]=cur; return acc; }, {});
      let newMethodsByKey = action.api.methods.reduce((acc, cur) => { acc[cur.methodKey]=cur; return acc; }, {});

      return {
        ...state,
        apis: {
          ...state.apis,
          [newApi.apiKey]:newApi,
        },
        interfaces: {
          ...state.interfaces,
          ...newInterfacesByKey,
        },
        methods: {
          ...state.methods,
          ...newMethodsByKey,
        }
      }

    case ActionTypes.UnloadApi:
      return state;

    default:
      (action: empty);
      return state;
  }
};
export default commandReducer;
