// @flow

// Fundamentals
export type Suggestion = {
  predictionText:string,
  methodKey:string,
};

export type BaseToken = {
  text:string,
};
export type FinToken = {
  type:'FIN',
  text: '',
};
export type TextToken = BaseToken & {
  type:'TEXT',
  isSelected:boolean,
};
export type CommandToken = BaseToken & {
  type:'COMMAND',
  method:Method,
  isSelected:boolean,
  commandKey:string,
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


export type Package = {
  api:Api,
  interfaces:Array<Interface>,
  methods:Array<Method>,
};
export type Interface = {
  interfaceKey:string,
  apiKey:string,
  interfaceName:string,
  methodKeys:Array<string>,
  interfaceType: 'CLASS' | 'INSTANCE',
};
export type Api = {
  apiKey:string,
  apiName:string,
  objectItemKey?:string,
  interfaceKeys:Array<string>,
};
export type Method = {
  methodKey:string,
  methodName:string,
  interfaceKey:string,
  action:{
    +type:string,
  }
};
export type Object = {
  objectItemKey:string,
  instanceApiKey:string,
  classInterfaceKeys:Array<string>,
};
