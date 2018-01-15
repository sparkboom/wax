import * as Types from './types';

// Types

export type CommandState = {
  +tokens: Array<Types.Token>,
  +apis: {},
  +interfaces: {},
  +methods: {},
  +objects: {},
};

// Code

const initialState:CommandState = {
  tokens: [{type:'TEXT',text:'',isSelected:false}],
  apis: {},
  interfaces: {},
  methods: {},
  objects: {},
};

export default initialState;
