// @flow

import * as ActionTypes from './action-types';
import * as Actions from './actions';
import * as Types from './types';
import remove from 'lodash/remove';
import * as State from './state';
import get from 'lodash/get';

// Types

type CommandReducer = (typeof State, Actions.Union) => typeof State;

// Code

const commandReducer:CommandReducer = (state = State.default, action) => {
  switch (action.type) {

    case ActionTypes.SetTokens:
      const suggestionToken:?Types.SuggestionToken = action.tokens.find(t => t.type==='SUGGESTION');
      const suggestion = get(suggestionToken, 'suggestions[0]') || null;
      return {
        ...state,
        tokens: action.tokens,
        currentSuggestion: suggestion,
      };

    case ActionTypes.SetSuggestion:
      return {
        ...state,
        currentSuggestion: action.suggestion,
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

      const {itemKey, name, parentItemKey} = action;
      const newState = {
        ...state,
        apis: {
          ...state.apis,
          [itemKey]:{
            apiKey:itemKey,
            apiName:name,
            objectItemKey:itemKey,
            interfaceKeys:[itemKey],
          }
        },
        interfaces: {
          ...state.interfaces,
          [itemKey]:{
            interfaceKey:itemKey,
            apiKey:itemKey,
            interfaceName:name,
            methodKeys:[],
            interfaceType:'INSTANCE',
          },
        },
        objects:{
          ...state.objects,
          [itemKey]:{
            objectItemKey:itemKey,
            instanceApiKey:itemKey,
            classInterfaceKeys:[action.class],
          }
        }
      };

      //add changes to parent items
      if (parentItemKey){

        const parentInterface = state.interfaces[action.parentItemKey];

        // add object selector method to parent interface
        newState.interfaces[parentItemKey] = {
          ...parentInterface,
          methodKeys:[...parentInterface.methodKeys, itemKey],
        };
        newState.methods[itemKey] = {
          methodKey:itemKey,
          methodName:name,
          interfaceKey:parentItemKey,
          action:{
            type:'CANVAS:SELECT_NODE',
            nodeItemKeys:[itemKey]
          }
        };
      }

      return newState;


    case ActionTypes.InputChange:
      return state;

    default:
      (action: empty);
      return state;
  }
};
export default commandReducer;
