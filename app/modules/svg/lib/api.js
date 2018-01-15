// @flow

import {createItem} from '../../../containers/app/actions';
import shortid from 'shortid';
import * as CommandTypes from '../../../containers/command/types';

// Code

export default function api(){

  const parentNodeKey = 'svg';
  const apiSvgKey = shortid.generate();
  const interfaceSvgKey = shortid.generate();
  const interfaceSvgShapeKey = shortid.generate();

  const addCircleMethodAction = createItem({
    category: 'cir',
    parentNodeKey: parentNodeKey,
  },{
    classInterfaceKeys:[interfaceSvgShapeKey],
  },{
    classKey:'shape',
    moduleKey:'svg',
    properties:{
      shape: 'circle'
    }
  });
  const addCircleMethod:CommandTypes.Method = {
    methodKey: shortid.generate(),
    methodName: 'addcircle',
    interfaceKey: interfaceSvgKey,
    action: addCircleMethodAction,
  };

  const addTriangleMethodAction = createItem({
    category: 'tri',
    parentNodeKey: parentNodeKey,
  },{
    classInterfaceKeys:[interfaceSvgShapeKey],
  },{
    classKey:'shape',
    moduleKey:'svg',
    properties:{
      shape: 'triangle'
    }
  });
  const addTriangleMethod = {
    methodKey: shortid.generate(),
    methodName: 'addtriangle',
    interfaceKey: interfaceSvgKey,
    action: addTriangleMethodAction
  };

  const addSquareMethodAction = createItem({
    category: 'sqr',
    parentNodeKey: parentNodeKey,
  },{
    classInterfaceKeys:[interfaceSvgShapeKey],
  },{
    classKey:'shape',
    moduleKey:'svg',
    properties:{
      shape: 'square'
    }
  });
  const addSquareMethod = {
    methodKey: shortid.generate(),
    methodName: 'addsquare',
    interfaceKey: interfaceSvgKey,
    action: addSquareMethodAction
  };

  const interfaceSvg = {
    interfaceKey: interfaceSvgKey,
    apiKey: apiSvgKey,
    interfaceName : 'svg',
    interfaceType: 'CLASS',
    methodKeys: [addCircleMethod.methodKey, addSquareMethod.methodKey, addSquareMethod.methodKey]
  };

  const interfaceSvgShape = {
    interfaceKey: interfaceSvgShapeKey,
    interfaceName: 'shape',
    apiKey: apiSvgKey,
    interfaceType: 'CLASS',
    methodKeys: []
  };

  return {
    api:{
      apiKey: apiSvgKey,
      apiName: 'svg',
      interfaceKeys: [interfaceSvgKey, interfaceSvgShapeKey],
    },
    interfaces: [
      interfaceSvg,
      interfaceSvgShape,
    ],
    methods:[
      addCircleMethod,
      addTriangleMethod,
      addSquareMethod,
    ],
  }
}
