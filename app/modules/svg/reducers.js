// @flow

import * as ActionTypes from './action-types';
import * as Actions from './actions';
import * as State from './state';

// Types

type SVGReducer = (State.SVGState, Actions.Union) => State.SVGState;

// Code

const svgReducer:SVGReducer = (state = State.default, action) => {

  switch (action.type) {

    case ActionTypes.CreateShape:
      if (!action.key){
        console.warn('Action has no key');
        return {...state};
      }
      return {
        ...state,
        items: {...state.items, [action.key]:{key:action.key, shape:action.shape}},
      };

    default:
      return state;
  }
};

export default svgReducer;
