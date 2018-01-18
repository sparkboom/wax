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
  objects: {},
};

export default initialState;
