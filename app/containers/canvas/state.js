import * as Types from './types';

// Types

export type CanvasState = {
  nodes:{
    [string]:Types.Node,
  },
  selection: [],
}

// Code

const initialState:CanvasState = {
  nodes: {},
  selection: [],
};

export default initialState;
