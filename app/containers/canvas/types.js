// @flow

export type RootNode = {
  key:'root'
};

export type Node = RootNode | {
  nodeKey:string,
  name:string,
  childNodes:Array<Node>,
  parentNode:?Node,
};
