// @flow

export type RootNode = {
  key:'root'
};

export type Node = RootNode | {
  key:string,
  name:string,
  nodeClass:string,
  parentKey:string,
};
