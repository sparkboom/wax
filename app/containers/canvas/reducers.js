// @flow

import * as ActionTypes from './action-types';
import * as Actions from './actions';
import * as State from './state';
import * as Types from './types';

// Types

type CanvasReducer = (State.CanvasState, Actions.Union) => State.CanvasState;

// Code

const canvasReducer:CanvasReducer = (state = State.default, action) => {
  switch (action.type) {

    case ActionTypes.CreateNode:
      const parentNode = state.nodes[action.parentItemKey];
      return {
        ...state,
        nodes:{
          ...state.nodes,
          [action.parentItemKey]:{
            ...parentNode,
            childNodeKeys:[...parentNode.childNodeKeys, action.itemKey],
          },
          [action.itemKey]:{
            nodeItemKey:action.itemKey,
            name:action.name,
            parentNodeKey:action.parentItemKey,
            childNodeKeys: [],
          }
        }
      };

    case ActionTypes.SelectNode:
      return {
        ...state,
        selection: [...action.nodeItemKeys],
      };

    default:
      (action: empty);
      return state;

  }
};

export default canvasReducer;
