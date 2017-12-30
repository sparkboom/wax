// @flow

export type Selection = {
  start : number,
  length : number,
};
export type Commands = Array<string>;
export type CommandState = {
  +text : string,
  +selection : Selection,
  +knownCommands: Commands,
};

export type TextChangeActionType = 'COMMAND:TEXT_CHANGE';
export type SetSelectionActionType = 'COMMAND:SET_SELECTION';
export type CommandActionType =
  | TextChangeActionType
  | SetSelectionActionType;

export type TextChangeAction = {type:TextChangeActionType, text:string };
export type SetSelectionAction = {type:SetSelectionActionType, start:number, length:number };
export type CommandAction =
  | TextChangeAction
  | SetSelectionAction;

export type CommandDispatch = CommandAction => void;
export type State = {
  command : CommandState
};
