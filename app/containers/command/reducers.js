import {SET_TOKENS} from './action-types';
import type {CommandState, CommandAction} from './types';

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
    default:
      (action: empty);
      return state;
  }
};
