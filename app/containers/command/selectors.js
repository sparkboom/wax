import {interfaceNodeKey, interfaceParentNodeKey, interfaceChildNodeKey, interfaceGlobalKey} from '../canvas/lib/api';
import {createSelector} from 'reselect';
import merge from 'lodash/merge';
import intersection from 'lodash/intersection';

// Code

// Direct functions

const getNodes = props => props.canvas.nodes;
const getObjects = props => props.command.objects;
const getApis = props => props.command.apis;
const getInterfaces = props => props.command.interfaces;
const getSelection = props => props.canvas.selection;

// Selector - Get Node Interfaces for selection

const getNodeInterfaces = node => ([
  interfaceNodeKey,
  interfaceGlobalKey,
  (node.childNodeKeys.length>0? interfaceChildNodeKey : null),
  (!!node.parentNodeKey? interfaceParentNodeKey : null)
].filter(e => e!==null));
const getSelectedNodeInterfacesByItemKey = createSelector(
      getNodes,
      getSelection,
      (nodes, selection=[]) => {
        const selectedNodeInterfacesByKey = selection.reduce((acc,itemKey) => {
          acc[itemKey]=getNodeInterfaces(nodes[itemKey]);
          return acc;
        }, {});
        return selectedNodeInterfacesByKey;
      });

// Selector - Get Class Interfaces for selection

const getClassInterfacesForSelectedObjectsByItemKey = createSelector(
      getObjects,
      getSelection,
      (objects, selection=[]) => selection.reduce((acc,itemKey) => {
        acc[itemKey]=objects[itemKey].classInterfaceKeys;
        return acc;
      }, {}));

// Selector - Get Instance Interfaces for selection

const getObject = (objects, itemKey) => objects && itemKey && objects[itemKey];
const getInstanceApiKey = object => object && object.instanceApiKey;
const getInstanceInterfaceFromApi = (apis, apiKey) => apis && apiKey && apis[apiKey].interfaces[0];
const getInstanceInterfaceKeyByItemKey = (itemKey, objects, apis) => getInstanceInterfaceFromApi(apis, getInstanceApiKey(getObject(objects, itemKey)));
const getInstanceInterfacesForSelectedObjectByItemKey = createSelector(
      getApis,
      getObjects,
      getSelection,
      (objects, apis, selection=[]) => selection.reduce((acc,itemKey) => {
        acc[itemKey]=getInstanceInterfaceKeyByItemKey(itemKey, objects, apis);
        return acc;
      }, {}));

// Combine Interfaces

export const currentContext = createSelector(
      getSelectedNodeInterfacesByItemKey,
      getClassInterfacesForSelectedObjectsByItemKey,
      getInstanceInterfacesForSelectedObjectByItemKey,
      (nodeInterfaceKeys, classInterfaceKeys, instanceInterfaceKeys) => {
        const supportedInterfacesByItemKey = merge({}, nodeInterfaceKeys, classInterfaceKeys, instanceInterfaceKeys);
        const commonInterfaceKeys = intersection(Object.values(supportedInterfacesByItemKey));
        return commonInterfaceKeys[0];
      },
);

export const contextInterfaces = createSelector(
      currentContext,
      getInterfaces,
      (interfaceKeys, interfaces) => {
        console.log( 'interfaceKeys, interfaces', interfaceKeys, interfaces );
        const interfaceNames = interfaceKeys && interfaceKeys.map( k => interfaces[k] && interfaces[k]);
        console.log('interfaceNames', interfaceNames);
        return interfaceNames || [];
      }
);
