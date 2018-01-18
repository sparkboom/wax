// @flow

import shortid from 'shortid';
import * as CommandTypes from '../../../containers/command/types';

// Code

const apiSvgKey = shortid.generate();
export const interfaceSvgKey = shortid.generate();
export const interfaceSvgShapeKey = shortid.generate();

const addCircleMethod:CommandTypes.Method = {
  methodKey: shortid.generate(),
  methodName: 'addcircle',
  interfaceKey: interfaceSvgKey,
  action: {
    type: 'SVG:WILL_CREATE_SHAPE',
    shape: 'circle',
  },
};

const addTriangleMethod:CommandTypes.Method = {
  methodKey: shortid.generate(),
  methodName: 'addtriangle',
  interfaceKey: interfaceSvgKey,
  action: {
    type: 'SVG:WILL_CREATE_SHAPE',
    shape: 'triangle',
  },
};

const addSquareMethod:CommandTypes.Method = {
  methodKey: shortid.generate(),
  methodName: 'addsquare',
  interfaceKey: interfaceSvgKey,
  action: {
    type: 'SVG:WILL_CREATE_SHAPE',
    shape: 'square',
  },
};

const interfaceSvg:CommandTypes.Interface = {
  interfaceKey: interfaceSvgKey,
  apiKey: apiSvgKey,
  interfaceName : '#svg',
  interfaceType: 'CLASS',
  methodKeys: [addCircleMethod.methodKey, addSquareMethod.methodKey, addTriangleMethod.methodKey]
};

const interfaceSvgShape:CommandTypes.Interface = {
  interfaceKey: interfaceSvgShapeKey,
  interfaceName: '#shape',
  apiKey: apiSvgKey,
  interfaceType: 'CLASS',
  methodKeys: []
};

export default {
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
