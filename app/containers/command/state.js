import * as Types from './types';

// Types

export type CommandState = {
  +tokens: Array<Types.Token>,
  currentSuggestion:?Types.Suggestion,
  +apis: {},
  +interfaces: {},
  +methods: {},
  +objects: {},
};

// Code

const initialState:CommandState = {
  tokens: [{type:'TEXT',text:'',isSelected:false}],
  currentSuggestion:null,
  apis: {},
  interfaces: {},
  methods: {},
  objects: {},
};

export default initialState;
