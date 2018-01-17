// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';
import shortid from 'shortid';

// Types

type Tokens = Array<Types.Token>;
type Match = {};

export type SetTokens = {type:typeof ActionTypes.SetTokens , tokens:Tokens};
export type FilterTokens = {type:typeof ActionTypes.FilterTokens, match:Match};
export type LoadApi = {type:typeof ActionTypes.LoadApi, api:Types.Package};
export type UnloadApi = {type:typeof ActionTypes.UnloadApi, apiKey:string};
export type CreateObject = {type:typeof ActionTypes.CreateObject, objectItemKey:string, instanceApiKey:string, classInterfaceKeys:Array<string>};
export type CreateMethod = {type:typeof ActionTypes.CreateMethod, method:Types.Method};

export type CreateObjectCreator = (string, string, Array<string>)=>CreateObject ;
export type CreateMethodCreator = (string, string, {+type:string})=>CreateMethod ;
export type LoadInstanceApiCreator = (string, string)=>LoadApi;
export type Union =
  | SetTokens
  | FilterTokens
  | LoadApi
  | UnloadApi
  | CreateObject
  | CreateMethod;

  // Code

  export const setTokens:Tokens=>SetTokens = tokens => ({type:ActionTypes.SetTokens, tokens});
  export const filterTokens:Match=>FilterTokens = match => ({type:ActionTypes.FilterTokens, match});
  export const unloadApi:string=>UnloadApi = apiKey => ({type:ActionTypes.UnloadApi, apiKey});
  export const loadApi:Types.Package=>LoadApi = api => ({type:ActionTypes.LoadApi, api});
  export const createObject:CreateObjectCreator = (objectItemKey, instanceApiKey, classInterfaceKeys) => ({type:ActionTypes.CreateObject, objectItemKey, instanceApiKey, classInterfaceKeys});

  export const createMethod:CreateMethodCreator = (interfaceKey, methodName, action) => {
    const methodKey = shortid.generate();
    return {
      type:ActionTypes.CreateMethod,
      method: {
        methodKey: methodKey,
        methodName: methodName,
        interfaceKey: interfaceKey,
        action,
      }
    };
  };

  // Creates an empty Api ready to
  export const loadInstanceApi:LoadInstanceApiCreator = (itemName, itemKey) => {

    const instanceInterfaceKey:string = shortid.generate();
    const instanceApiKey:string = shortid.generate();

    return {
      type:ActionTypes.LoadApi,
      api: {
        api:{
          apiKey:instanceApiKey,
          apiName:itemName,
          interfaceKeys:[instanceInterfaceKey],
          objectItemKey:itemKey,
        },
        interfaces:[{
          interfaceKey:instanceInterfaceKey,
          apiKey:instanceApiKey,
          interfaceName: itemName,
          interfaceType:'INSTANCE',
          methodKeys:[],
        }],
        methods:[],
      }
    };
  };
