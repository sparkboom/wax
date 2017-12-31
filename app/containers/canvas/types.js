// @flow
import type {AppAction} from '../app/types';

export type Command = {
  shape:string
};

export type CanvasState = {
  items: Array<mixed>,
  selection: Array<number>,
};

export type ToggleSelectionActionType = 'APP:TOGGLE_SELECTION';
export type RemoveSelectionActionType = 'APP:REMOVE_SELECTION';


export type ToggleSelectionAction = {type:ToggleSelectionActionType, id:number, metaKey: boolean};
export type RemoveSelectionAction = {type:RemoveSelectionActionType};

export type CanvasAction =
  | AppAction
  | ToggleSelectionAction
  | RemoveSelectionAction;

export type CanvasDispatch = CanvasAction => void;
export type State = {
  canvas: CanvasState
};
