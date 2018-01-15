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
      const parentNode = state.nodes[action.parentNodeKey];
      const {type, ...node} = action;
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [parentNode.nodeItemKey]:{
            ...parentNode,
            childNodeKeys:[...parentNode.childNodeKeys, action.nodeItemKey],
          },
          [node.nodeItemKey]:node
        }
      };
    case ActionTypes.SetSelection:
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
