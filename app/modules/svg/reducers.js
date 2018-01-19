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
    case ActionTypes.CreateItem:

      if (action.class===Api.interfaceSvgKey){
        return {
          ...state,
          svg: {
            ...state.svg,
            [action.itemKey]:{
              key:action.itemKey
            }
          }
        };
      }else if (action.class===Api.interfaceSvgShapeKey){

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
      }else {

        return state;
      }

    default:
      (action: empty)
      return state;
  }
};

export default svgReducer;
