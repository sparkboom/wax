import * as Types from './types';

// Types

export type CommandState = {
  +tokens: Array<Types.Token>,
  +classes: {},
  +methods: {},
};

// Code

const initialState:CommandState = {
  tokens: [{type:'TEXT',text:'',isSelected:false}],
  classes: {},
  methods: {},
};

export default initialState;
