// @flow

import {TOGGLE_SELECTION, REMOVE_SELECTION, ADD_SHAPE} from './action-types';
import includes from 'lodash/includes';
import range from 'lodash/range';
import filter from 'lodash/filter';
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
    //
    // case TOGGLE_SELECTION:
    //   let selection;
    //   if (action.metaKey){
    //     selection = includes(state.selection, action.id)? filter(state.selection, s => s!==action.id): [...state.selection, action.id];
    //   } else if (state.selection.length>1) {
    //     selection = [action.id];
    //   } else {
    //     selection = includes(state.selection, action.id)? []: [action.id];
    //   }
    //
    //   return {
    //     ...state,
    //     selection,
    //   };

    // case REMOVE_SELECTION:
    //   return {
    //     ...state,
    //     selection: [],
    //   };

    default:
      return state;
  }
};

export default svgReducer;
