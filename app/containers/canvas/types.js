// @flow

export type Node = {
  nodeItemKey:string,
  name:string,
  parentNodeKey:?string,
  childNodeKeys:Array<string>,
};
