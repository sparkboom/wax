import * as Types from './types';

// Types

export type CanvasState = {
  nodes:Array<Types.Node>
}

// Code

const initialState:CanvasState = {
  nodes: [],
};

export default initialState;
