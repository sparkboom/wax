// @flow

import * as ActionTypes from './action-types';
import * as Actions from './actions';
import * as State from './state';
import * as Types from './types';
import {selectChildNodeKeys} from './lib/selection';

// Types

type CanvasReducer = (State.CanvasState, Actions.Union) => State.CanvasState;

// Code

const canvasReducer:CanvasReducer = (state = State.default, action) => {
  switch (action.type) {

    case ActionTypes.CreateNode:

      const newState = {
        ...state,
        nodes:{
          ...state.nodes,
          [action.itemKey]:{
            nodeItemKey:action.itemKey,
            name:action.name,
            parentNodeKey:null,
            childNodeKeys: [],
          }
        }
      };

      if (action.parentItemKey){
        const parentNode = state.nodes[action.parentItemKey];
        newState.nodes[action.parentItemKey] = {
          ...parentNode,
          childNodeKeys:[...parentNode.childNodeKeys, action.itemKey],
        };
        newState.nodes[action.itemKey].parentNodeKey = action.parentItemKey;
      }

      return newState;

    case ActionTypes.SelectNode:
      return {
        ...state,
        selection: [...action.nodeItemKeys],
      };

    case ActionTypes.SelectParent:
      const parentKeys = state.selection.map(k => state.nodes[k].parentNodeKey);
      return {
        ...state,
        selection: parentKeys,
      };

    case ActionTypes.SelectRoot:
      return {
        ...state,
        selection: ['root'],
      };

    case ActionTypes.Deselect:
      return {
        ...state,
        selection: [],
      };

    case ActionTypes.SelectChildren:

      return {
        ...state,
        selection: [...selectChildNodeKeys(state)],
      };

    case ActionTypes.SelectAll:

      return {
        ...state,
        selection: [...Object.keys(state.nodes)],
      };

    default:
      (action: empty);
      return state;

  }
};

export default canvasReducer;
