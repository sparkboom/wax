// @flow

import {createNode} from '../../../containers/canvas/actions';
import shortid from 'shortid';

// Code

export default function api(){

  const apiSvgKey = shortid.generate();
  const interfaceSvgKey = shortid.generate();
  const interfaceSvgShapeKey = shortid.generate();

  const addCircleMethod = {
    methodKey: shortid.generate(),
    methodName: 'addcircle',
    interfaceKey: interfaceSvgKey,
    action: createNode({nodeClass: 'SVG:SHAPE', interfaces: [interfaceSvgShapeKey],  family: 'cir', args: {shape:'circle'}}),
  };

  const addTriangleMethod = {
    methodKey: shortid.generate(),
    methodName: 'addtriangle',
    interfaceKey: interfaceSvgKey,
    action: createNode({nodeClass: 'SVG:SHAPE', interfaces: [interfaceSvgShapeKey],  family: 'tri', args: {shape:'triangle'}}),
  };

  const addSquareMethod = {
    methodKey: shortid.generate(),
    methodName: 'addsquare',
    interfaceKey: interfaceSvgKey,
    action: createNode({nodeClass: 'SVG:SHAPE', interfaces: [interfaceSvgShapeKey],  family: 'sq', args: {shape:'square'}}),
  };

  const interfaceSvg = {
    interfaceKey: interfaceSvgKey,
    apiKey: apiSvgKey,
    interfaceName : 'Svg',
    interfaceType: 'CLASS',
    //nodeKey: n/a for class interfaces,
    methodKeys: [addCircleMethod.methodKey, addSquareMethod.methodKey, addSquareMethod.methodKey]
  };

  const interfaceSvgShape = {
    interfaceKey: interfaceSvgShapeKey,
    interfaceName: 'Svg:Shape',
    apiKey: apiSvgKey,
    interfaceType: 'CLASS',
    //nodeKey: n/a for class interfaces,
    methodKeys: []
  };

  return {
    api:{
      apiKey: apiSvgKey,
      apiName: 'SVG',
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
