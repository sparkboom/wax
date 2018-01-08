import {SET_TOKENS, FILTER_TOKENS} from './action-types';
import type {CommandState, CommandAction} from './types';
import remove from 'lodash/remove';

const initialState : CommandState = {
  tokens: [{type:'TEXT',text:'',isSelected:false}],
};

const confine:ConfineType= (val, min, max) => Math.max(Math.min(val, max), min);

export default (state:CommandState = initialState, action:CommandAction) : CommandState => {
  switch (action.type) {
    case SET_TOKENS:
      return {
        tokens: action.tokens
      };
    case FILTER_TOKENS:
      let tokens = [...state.tokens];
      remove(tokens, action.match);
      return {
        tokens
      };
    default:
      (action: empty);
      return state;
  }
};
