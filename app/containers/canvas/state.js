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
  nodes: {
    root: {
      nodeItemKey:'root',
      name: 'root',
      parentNodeKey: null,
      childNodeKeys: [],
    }
  },
  selection: [],
};

export default initialState;
