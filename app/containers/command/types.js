// @flow

import type {Suggestion} from '../app/lib/exec';

// Fundamentals
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
  },
  isExecuting?:boolean
};
export type CaretToken = {
  type:'CARET',
  text:'',
  isSelected:true,
};
export type SuggestionToken = BaseToken & Suggestion & {
  type:'SUGGESTION',
  text:'',
  isSelected:false,
};
export type Token =
  | TextToken
  | CommandToken
  | CaretToken
  | FinToken
  | SuggestionToken;
