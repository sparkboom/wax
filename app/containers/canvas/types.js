// @flow

export type Shape =
  | 'CIRCLE'
  | 'SQUARE'
  | 'TRIANGLE';

export type ShapeObject = {
  shape: Shape,
};
export type CanvasState = {
  items: Array<ShapeObject>
};

export type ToggleSelectionActionType = 'APP:TOGGLE_SELECTION';

export type ToggleSelectionAction = {type:ToggleSelectionActionType, id:number};

// export type CanvasDispatch = CanvasAction => void;
export type State = {
  canvas : CanvasState
};
