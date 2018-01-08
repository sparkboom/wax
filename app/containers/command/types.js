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
export type ChangeTextActionType = 'COMMAND:CHANGE_TEXT';
export type SetSelectionActionType = 'COMMAND:SET_SELECTION';
export type CreateTokenActionType = 'COMMAND:CREATE_TOKEN';
export type RemoveTokensActionType = 'COMMAND:REMOVE_TOKENS';
export type SetTokensActionType = 'COMMAND:SET_TOKENS';
export type CommandActionType =
  | ChangeTextActionType
  | SetSelectionActionType
  | CreateTokenActionType
  | RemoveTokensActionType
  | SetTokensActionType;

// Actions
export type ChangeTextAction = {type:ChangeTextActionType, text:string };
export type SetSelectionAction = {type:SetSelectionActionType, start:number, length:number };
export type CreateTokenAction = {type:CreateTokenActionType, command:string, action:{type:string} };
export type RemoveTokensAction = {type:RemoveTokensActionType, tokenIndexes:?number[]};
export type SetTokensAction = {type:SetTokensActionType, tokens:{}[]};
export type CommandAction =
  | AppAction
  | ChangeTextAction
  | SetSelectionAction
  | CreateTokenAction
  | RemoveTokensAction
  | SetTokensAction;

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
  changeText : string=>void,
  changeSelection : (number, number)=>void,
  createToken : Token=>void,
  executeCommand : Commands=>void,
  removeTokens : void=>void,
};
export type CommandConnectDispatch = (CommandAction => void) => CommandDispatch;
