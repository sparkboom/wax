// @flow

// External
import type {AppAction} from '../app/types';
import type {Suggestion} from '../../modules';

// Fundamentals
export type TokenType =
  | 'STRING'
  | 'COMMAND'
  | 'PREDICTION'
  | 'CARET';

export type StringToken = {
  type:'STRING',
  text:string,
  isSelected:boolean,
};
export type CommandToken = {
  type:'COMMAND',
  text:string,
  command:string,
  action:{
    type:string
  },
  isSelected:boolean,
};
export type CaretToken = {
  type:'CARET',
  text:'',
  isSelected:true,
};
export type Token =
  | StringToken
  | CommandToken
  | CaretToken;

export type Commands = Token[];

// Action Types
export type SetTokensActionType = 'COMMAND:SET_TOKENS';
export type FilterTokensActionType = 'COMMAND:FILTER_TOKENS';
export type CommandActionType =
  | SetTokensActionType
  | FilterTokensActionType;

// Actions
export type SetTokensAction = {type:SetTokensActionType, tokens:{}[]};
export type FilterTokensAction = {type:FilterTokensActionType, match:{}};
export type CommandAction =
  | AppAction
  | SetTokensAction
  | FilterTokensAction;

// State
export type CommandState = {
  +tokens: Array<Token>,
};
export type CommandStore = {
  command : CommandState
};

// Props
export type CommandReduxProps = CommandState;
export type CommandConnectReduxProps = CommandStore => CommandReduxProps;

// Dispatch
export type CommandDispatch = {
  executeCommand : Commands=>void,
  setTokens : Token[]=>void,
};
export type CommandConnectDispatch = (CommandAction => void) => CommandDispatch;
