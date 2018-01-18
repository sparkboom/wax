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
  apis: {
    'root':{
      apiKey:'root',
      apiName:'root',
      objectItemKey:'root',
      interfaceKeys:['root']
    },
  },
  interfaces: {
    'root':{
      interfaceKey:'root',
      apiKey:'root',
      interfaceName:'root',
      methodKeys:[],
      interfaceType:'INSTANCE',
    },
  },
  methods: {},
  objects: {
    'root':{
      objectItemKey:'root',
      instanceApiKey:'root',
      classInterfaceKeys:[],
    }
  },
};

export default initialState;
