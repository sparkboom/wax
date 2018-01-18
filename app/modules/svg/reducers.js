// @flow

import * as ActionTypes from './action-types';
import * as Actions from './actions';
import * as State from './state';
import * as Api from './lib/api';

// Types

type SVGReducer = (State.SVGState, Actions.Union) => State.SVGState;

// Code

const svgReducer:SVGReducer = (state = State.default, action) => {

  switch (action.type) {
    case ActionTypes.CreateShape:

      if (action.class!==Api.interfaceSvgShapeKey){
        return state;
      }

      return {
        ...state,
        items: {
          ...state.items,
          [action.itemKey]:{
            key:action.itemKey,
            ...action.properties
          }
        }
      };

    default:
      (action: empty)
      return state;
  }
};

export default svgReducer;
