// @flow

import {ADD_SHAPE} from './action-types';
import type {SVGState, Command, SVGAction} from './types';

const initialState:SVGState = {
  items: [],
  selection: [],
}

type SVGReducer = (SVGState, SVGAction) => SVGState;
const svgReducer:SVGReducer = (state = initialState, action:SVGAction) => {

  switch (action.type) {

    case ADD_SHAPE:
      return {
        ...state,
        items: [...state.items, {shape:action.shape}],
      };

    default:
      return state;
  }
};

export default svgReducer;
