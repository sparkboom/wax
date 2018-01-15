// @flow

export type Node = {
  nodeKey:string,
  name:string,
  parentNodeKey:?string,
  childNodeKeys:Array<string>,
};
