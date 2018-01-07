// @flow

// External
import type {AppAction} from '../app/types';

// Fundamentals
export type Selection = {
  +start : number,
  +length : number,
};
export type Commands = Array<string>;

// Action Types
export type ChangeTextActionType = 'COMMAND:CHANGE_TEXT';
export type SetSelectionActionType = 'COMMAND:SET_SELECTION';
export type CompletePredictionActionType = 'COMMAND:COMPLETE_PREDICTION';
export type RemoveTokensActionType = 'COMMAND:REMOVE_TOKENS';
export type CommandActionType =
  | ChangeTextActionType
  | SetSelectionActionType
  | CompletePredictionActionType
  | RemoveTokensActionType;

// Actions
export type ChangeTextAction = {type:ChangeTextActionType, text:string };
export type SetSelectionAction = {type:SetSelectionActionType, start:number, length:number };
export type CompletePredictionAction = {type:CompletePredictionActionType, prediction:string };
export type RemoveTokensAction = {type:RemoveTokensActionType};
export type CommandAction =
  | AppAction
  | ChangeTextAction
  | SetSelectionAction
  | CompletePredictionAction
  | RemoveTokensAction;

// State
export type CommandState = {
  +text : string,
  +selection : Selection,
  +tokens: Array<mixed>,
};
export type CommandStore = {
  command : CommandState
};

// Props
export type CommandProps = CommandState;
export type CommandConnectProps = CommandStore => CommandProps;

// Dispatch
export type CommandDispatch = {
  changeText : string=>void,
  changeSelection : (number, number)=>void,
  completePrediction : string=>void,
  executeCommand : mixed=>void,
  removeTokens : void=>void,
};
export type CommandConnectDispatch = (CommandAction => void) => CommandDispatch;
