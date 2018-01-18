// @flow

import * as Actions from '../actions';
import shortid from 'shortid';
import * as CommandTypes from '../../command/types';

// Code

export default function api(){

  const apiAppKey = shortid.generate();
  const interfaceAppKey = shortid.generate();

  const throwErrorMethod:CommandTypes.Method = {
    methodKey: shortid.generate(),
    methodName: 'throwerror',
    interfaceKey: interfaceAppKey,
    action: Actions.throwError(new Error('This is a test error')),
  };

  const addSvgMethod:CommandTypes.Method = {
    methodKey: shortid.generate(),
    methodName: 'addsvg',
    interfaceKey: interfaceAppKey,
    action: {type:'SVG:WILL_CREATE_SVG'},
  };

  const interfaceApp = {
    interfaceKey: interfaceAppKey,
    apiKey: apiAppKey,
    interfaceName : 'app',
    interfaceType: 'CLASS',
    methodKeys: [throwErrorMethod.methodKey],
  };

  return {
    api:{
      apiKey: apiAppKey,
      apiName: 'app',
      interfaceKeys: [interfaceAppKey],
    },
    interfaces: [
      interfaceApp
    ],
    methods:[
      throwErrorMethod,
      addSvgMethod,
    ],
  };
}
