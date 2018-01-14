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
      return {
        ...state,
        nodes: {...state.nodes, [action.node.key]:{...action.node}}
      };
    case ActionTypes.SetSelection:
      return {
        ...state,
        selection: [...action.nodeKeys],
      };
    default:
      (action: empty);
      return state;
  }
};

export default canvasReducer;
