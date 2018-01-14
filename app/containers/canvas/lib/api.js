// @flow

import {createNode} from '../../../containers/canvas/actions';
import shortid from 'shortid';

// Code

export default function api(){

  const apiCanvasKey = shortid.generate();
  const interfaceCanvasKey = shortid.generate();
  const interfaceNodeKey = shortid.generate();
  const interfaceParentNodeKey = shortid.generate();
  const interfaceChildNodeKey = shortid.generate();
  const interfaceGlobalKey = shortid.generate();

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

  const interfaceCanvas = {
    interfaceKey: interfaceCanvasKey,
    apiKey: apiCanvasKey,
    interfaceName : 'Canvas',
    interfaceType: 'CLASS',
    methodKeys: [],
  };

  const interfaceNode = {
    interfaceKey: interfaceNodeKey,
    apiKey: apiCanvasKey,
    interfaceName: 'Node',
    interfaceType: 'CLASS',
    methodKeys: []
  };

  const interfaceParentNode = {
    interfaceKey: interfaceParentNodeKey,
    apiKey: apiCanvasKey,
    interfaceName: 'ParentNode',
    interfaceType: 'CLASS',
    methodKeys: [methodSelectChildren.methodKey, methodSelectDescendents.methodKey]
  };

  const interfaceChildNode = {
    interfaceKey: interfaceChildNodeKey,
    apiKey: apiCanvasKey,
    interfaceName: 'ChildNode',
    interfaceType: 'CLASS',
    methodKeys: [methodSelectParent.methodKey],
  };

  const interfaceGlobal = {
    interfaceKey: interfaceGlobalKey,
    apiKey: apiCanvasKey,
    interfaceName: 'Global',
    interfaceType: 'CLASS',
    methodKeys: [methodSelectAll.methodKey],
  };
  
  return {
    api:{
      apiKey: apiCanvasKey,
      apiName: 'SVG',
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
    ],
  }
}
