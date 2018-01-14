// @flow

// Fundamentals
export type Suggestion = {
  command?:string,
  action?:{
  },
  prediction:?string,
  interfaceKey?:string,
  matched:boolean,
};

export type BaseToken = {
  key?:string,
  text:string,
  isSelected:boolean,
};
export type FinToken = {
  type:'FIN',
  text: '',
};
export type TextToken = BaseToken & {
  type:'TEXT',
};
export type CommandToken = BaseToken & {
  type:'COMMAND',
  command:string,
  action:{
    type:string
  }
};
export type CaretToken = {
  type:'CARET',
  text:'',
  isSelected:true,
};
export type SuggestionToken = BaseToken & {
  type:'SUGGESTION',
  text:'',
  isSelected:false,
  suggestions:Array<Suggestion>,
};
export type Token =
  | TextToken
  | CommandToken
  | CaretToken
  | FinToken
  | SuggestionToken;




export type BaseInterface = {
  interfaceKey:string,
  apiKey:string,
  interfaceName:string,
  methodKeys:Array<string>,
};
export type ClassInterface = BaseInterface & {
  interfaceType:'CLASS',
};
export type InstanceInterface = BaseInterface & {
  interfaceType:'INSTANCE',
  nodeKey:string,
};
export type Interface = ClassInterface | InstanceInterface;
export type Api = {
  api:{
    apiKey:string,
    apiName:string,
    interfaceKeys:Array<string>
  },
  interfaces:Array<Interface>,
  methods:Array<Method>,
};
export type Method = {
  methodKey:string,
  methodName:string,
  interfaceKey:string,
  action:{
    type:string,
  }
};
