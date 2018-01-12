import * as Types from './types';

// Types

export type AppState = {
  nodes:Array<Types.Node>
}

// Code

const initialState:AppState = {
  nodes: [],
};

export default initialState;
