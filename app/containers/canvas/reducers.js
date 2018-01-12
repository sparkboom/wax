// @flow

import * as ActionTypes from './action-types';
import * as Actions from './actions';
import * as State from './state';
import * as Types from './types';

// Types

type CanvasReducer = (typeof State, Actions.Union) => typeof State;

// Code

const canvasReducer:CanvasReducer = (state = State.default, action) => {
  switch (action.type) {
    case ActionTypes.CreateNode:
      return {
        nodes: [...state.nodes, {...action.node}]
      };
    default:
      (action: empty);
      return state;
  }
};

export default canvasReducer;
