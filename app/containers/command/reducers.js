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

      const {api, interfaces, methods} = action.api;
      const newInterfacesByKey = interfaces.reduce((acc, cur) => { acc[cur.interfaceKey]=cur; return acc; }, {});
      const newMethodsByKey = methods.reduce((acc, cur) => { acc[cur.methodKey]=cur; return acc; }, {});

      return {
        ...state,
        apis: {
          ...state.apis,
          [api.apiKey]:api,
        },
        interfaces: {
          ...state.interfaces,
          ...newInterfacesByKey,
        },
        methods: {
          ...state.methods,
          ...newMethodsByKey,
        }
      };

    case ActionTypes.UnloadApi:
      return state;

    case ActionTypes.CreateObject:
      const {type, ...newObject} = action;

      return {
        ...state,
        objects: {
          ...state.objects,
          [action.objectItemKey]:newObject,
        }
      };

    case ActionTypes.CreateMethod:
      const {interfaceKey, methodKey} = action.method;
      const iface = state.interfaces[interfaceKey];
      return {
        ...state,
        interfaces:{
          ...state.interfaces,
          [interfaceKey]:{
            ...iface,
            methodKeys:[...iface.methodKeys, methodKey],
          },
        },
        methods:{
          ...state.methods,
          [methodKey]: action.method,
        }
      };
    default:
      (action: empty);
      return state;
  }
};
export default commandReducer;
