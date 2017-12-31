// @flow
import type {AppAction} from '../app/types';

export type Selection = {
  +start : number,
  +length : number,
};
export type Commands = Array<string>;
export type CommandState = {
  +text : string,
  +selection : Selection,
  +knownCommands: Commands,
  +tokens: Array<mixed>,
};

export type TextChangeActionType = 'COMMAND:TEXT_CHANGE';
export type SetSelectionActionType = 'COMMAND:SET_SELECTION';
export type CompletePredictionActionType = 'COMMAND:COMPLETE_PREDICTION';
export type RemoveTokensActionType = 'COMMAND:REMOVE_TOKENS';
export type CommandActionType =
  | TextChangeActionType
  | SetSelectionActionType
  | CompletePredictionActionType
  | RemoveTokensActionType;

export type TextChangeAction = {type:TextChangeActionType, text:string };
export type SetSelectionAction = {type:SetSelectionActionType, start:number, length:number };
export type CompletePredictionAction = {type:CompletePredictionActionType, prediction:string };
export type RemoveTokensAction = {type:RemoveTokensActionType};
export type CommandAction =
  | AppAction
  | TextChangeAction
  | SetSelectionAction
  | CompletePredictionAction
  | RemoveTokensAction;

export type CommandDispatch = CommandAction => void;
export type State = {
  command : CommandState
};
