// @flow

export type Instruction = {
  method:{
    action:{
      type:string,
    },
  },
  commandKey:string,
}

export type NodeItem = {
  name?:string,
  category?:string,
  parentNodeKey:string,
  childNodeKeys?:Array<string>,
};

export type ObjectItem = {
  classInterfaceKeys:Array<string>
};

export type Item = {
  moduleKey:string,
  classKey:string,
  properties:any,
}
