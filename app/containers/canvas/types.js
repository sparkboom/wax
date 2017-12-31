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

// export type CanvasDispatch = CanvasAction => void;
export type State = {
  canvas : CanvasState
};
