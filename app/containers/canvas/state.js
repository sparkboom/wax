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
    'root':{
      key:'root',
      nodeClass: 'CANVAS',
      name:'canvas',
    }
  },
  selection: [],
};

export default initialState;
