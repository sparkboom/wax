import * as Types from './types';

// Types

export type CommandState = {
  +tokens: Array<Types.Token>,
  +apis: {},
  +interfaces: {},
  +methods: {},
};

// Code

const initialState:CommandState = {
  tokens: [{type:'TEXT',text:'',isSelected:false}],
  apis: {},
  interfaces: {},
  methods: {},
};

export default initialState;
