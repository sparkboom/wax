// @flow

// External
import type {AppAction} from '../app/types';
import type {Suggestion} from '../../modules';

// Fundamentals
export type Selection = {
  +start : number,
  +length : number,
};
export type Token = {
  command:string,
  action:{
    type:string
  }
};
export type Commands = Token[];

// Action Types
export type ChangeTextActionType = 'COMMAND:CHANGE_TEXT';
export type SetSelectionActionType = 'COMMAND:SET_SELECTION';
export type CreateTokenActionType = 'COMMAND:CREATE_TOKEN';
export type RemoveTokensActionType = 'COMMAND:REMOVE_TOKENS';
export type CommandActionType =
  | ChangeTextActionType
  | SetSelectionActionType
  | CreateTokenActionType
  | RemoveTokensActionType;

// Actions
export type ChangeTextAction = {type:ChangeTextActionType, text:string };
export type SetSelectionAction = {type:SetSelectionActionType, start:number, length:number };
export type CreateTokenAction = {type:CreateTokenActionType, command:string, action:{type:string} };
export type RemoveTokensAction = {type:RemoveTokensActionType, tokenIndexes:?number[]};
export type CommandAction =
  | AppAction
  | ChangeTextAction
  | SetSelectionAction
  | CreateTokenAction
  | RemoveTokensAction;

// State
export type CommandState = {
  +text : string,
  +selection : Selection,
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
