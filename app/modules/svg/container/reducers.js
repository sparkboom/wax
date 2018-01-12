// @flow

import * as ActionTypes from './action-types';
import type {SVGState, Command} from './types';

const initialState:SVGState = {
  items: [],
  selection: [],
}

type SVGReducer = (SVGState, any) => SVGState;
const svgReducer:SVGReducer = (state = initialState, action:any) => {

  switch (action.type) {

    case ActionTypes.AddShape:
      return {
        ...state,
        items: [...state.items, {key:action.key, shape:action.shape}],
      };

    default:
      return state;
  }
};

export default svgReducer;
