// @flow

// External
type ExecuteCommandAction = {type:'APP:EXECUTE_COMMAND', command:Command };

// Fundamentals - are these being used?
export type Command = {
  shape:string
};

// Action Types
export type ToggleSelectionActionType = 'SVG:TOGGLE_SELECTION';
export type RemoveSelectionActionType = 'SVG:REMOVE_SELECTION';
export type AddShapeActionType = 'SVG:ADD_SHAPE';

// Actions
export type ToggleSelectionAction = {type:ToggleSelectionActionType, id:number, metaKey: boolean};
export type RemoveSelectionAction = {type:RemoveSelectionActionType};
export type AddShapeAction = {type:AddShapeAction, shape:string, x:number, y:number, width:number, height:number};
export type SVGAction =
  | ExecuteCommandAction
  | ToggleSelectionAction
  | RemoveSelectionAction
  | AddShapeAction;

// State
export type SVGState = {
  items: Array<mixed>,
  selection: Array<number>,
};
export type SVGStore = {
  svg: SVGState
};

// Props
export type SVGProps = SVGState;
export type SVGConnectProps = SVGStore => SVGProps;

// Dispatch
export type SVGDispatch = {
  toggleSelection: (number,boolean)=>void,
  removeSelection: ()=>void,
};
export type SVGConnectDispatch = (SVGAction => void) => SVGDispatch;
