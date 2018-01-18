// @flow

import shortid from 'shortid';

// Code

const apiCanvasKey = shortid.generate();
const interfaceCanvasKey = shortid.generate();
export const interfaceNodeKey = shortid.generate();
export const interfaceParentNodeKey = shortid.generate();
export const interfaceChildNodeKey = shortid.generate();
export const interfaceGlobalKey = shortid.generate();

const methodRemoveNode = {
  methodKey: shortid.generate(),
  methodName: 'remove',
  interfaceKey: interfaceNodeKey,
  action: {type: 'CANVAS:REMOVE_NODE'}
};

const methodSelectChildren = {
  methodKey: shortid.generate(),
  methodName: 'selectchildren',
  interfaceKey: interfaceParentNodeKey,
  action: {type: 'CANVAS:SELECT_CHILDREN'}
};

const methodSelectDescendents = {
  methodKey: shortid.generate(),
  methodName: 'selectdescendents',
  interfaceKey: interfaceParentNodeKey,
  action: {type: 'CANVAS:SELECT_DESCENDENTS'}
};

const methodSelectParent = {
  methodKey: shortid.generate(),
  methodName: 'selectparent',
  interfaceKey: interfaceChildNodeKey,
  action: {type: 'CANVAS:SELECT_PARENT'}
};

const methodSelectAll = {
  methodKey: shortid.generate(),
  methodName: 'selectall',
  interfaceKey: interfaceGlobalKey,
  action: {type: 'CANVAS:SELECT_ALL'}
};

const methodSelectRoot = {
  methodKey: shortid.generate(),
  methodName: 'selectroot',
  interfaceKey: interfaceGlobalKey,
  action: {type: 'CANVAS:SELECT_ROOT'}
};

const methodDeselect = {
  methodKey: shortid.generate(),
  methodName: 'deselect',
  interfaceKey: interfaceGlobalKey,
  action: {type: 'CANVAS:DESELECT'}
};

const interfaceCanvas = {
  interfaceKey: interfaceCanvasKey,
  apiKey: apiCanvasKey,
  interfaceName : '#canvas',
  interfaceType: 'CLASS',
  methodKeys: [],
};

const interfaceNode = {
  interfaceKey: interfaceNodeKey,
  apiKey: apiCanvasKey,
  interfaceName: '#node',
  interfaceType: 'CLASS',
  methodKeys: []
};

const interfaceParentNode = {
  interfaceKey: interfaceParentNodeKey,
  apiKey: apiCanvasKey,
  interfaceName: '#parentnode',
  interfaceType: 'CLASS',
  methodKeys: [methodSelectChildren.methodKey, methodSelectDescendents.methodKey]
};

const interfaceChildNode = {
  interfaceKey: interfaceChildNodeKey,
  apiKey: apiCanvasKey,
  interfaceName: '#childnode',
  interfaceType: 'CLASS',
  methodKeys: [methodSelectParent.methodKey],
};

const interfaceGlobal = {
  interfaceKey: interfaceGlobalKey,
  apiKey: apiCanvasKey,
  interfaceName: '#global',
  interfaceType: 'CLASS',
  methodKeys: [methodSelectAll.methodKey, methodSelectRoot.methodKey, methodDeselect.methodKey],
};

export const api = {
  api:{
    apiKey: apiCanvasKey,
    apiName: 'canvas',
    interfaceKeys: [interfaceCanvasKey, interfaceNodeKey, interfaceParentNodeKey, interfaceChildNodeKey, interfaceGlobalKey],
  },
  interfaces: [
    interfaceCanvas,
    interfaceNode,
    interfaceParentNode,
    interfaceChildNode,
    interfaceGlobal,
  ],
  methods:[
    methodRemoveNode,
    methodSelectChildren,
    methodSelectDescendents,
    methodSelectParent,
    methodSelectAll,
    methodSelectRoot,
    methodDeselect,
  ],
}
