import * as Types from './types';

// Types

export type CommandState = {
  +tokens: Array<Types.Token>,
};

// Code

const initialState:CommandState = {
  tokens: [{type:'TEXT',text:'',isSelected:false}],
};

export default initialState;
