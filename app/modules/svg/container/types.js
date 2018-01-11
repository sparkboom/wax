// @flow

// Fundamentals
export type Command = {
  shape:string
};

// External
//type ExecuteCommandAction = {type:'APP:EXECUTE_COMMAND', command:Command };

// Actions


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
