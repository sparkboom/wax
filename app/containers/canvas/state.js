import * as Types from './types';

// Types

export type CanvasState = {
  nodes:{
    [string]:Types.Node,
  }
}

// Code

const initialState:CanvasState = {
  nodes: {

  },
};

export default initialState;
