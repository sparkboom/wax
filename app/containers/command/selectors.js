import {interfaceNodeKey, interfaceParentNodeKey, interfaceChildNodeKey, interfaceGlobalKey} from '../canvas/lib/api';
import {createSelector} from 'reselect';
import mergeWith from 'lodash/mergeWith';
import get from 'lodash/get';
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
  (node.childNodeKeys.length>0? interfaceParentNodeKey : null),
  (!!node.parentNodeKey? interfaceChildNodeKey : null)
].filter(e => e!==null));

const getSelectedNodeInterfacesByItemKey = createSelector(
      getNodes,
      getSelection,
      (nodes, selection=[]) => {
        const selectedNodeInterfacesByKey = selection.reduce((acc,itemKey) => {
          const node = nodes[itemKey];
          if (node){
            acc[itemKey] = getNodeInterfaces(nodes[itemKey]);
          }
          return acc;
        }, {});
        return selectedNodeInterfacesByKey;
      });

// Selector - Get Class Interfaces for selection

const getClassInterfacesForSelectedObjectsByItemKey = createSelector(
      getObjects,
      getSelection,
      (objects, selection=[]) => {
        const selectedClassInterfacesByKey = selection.reduce((acc,itemKey) => {
          const object = objects[itemKey];
          if (object){
            acc[itemKey] = objects[itemKey].classInterfaceKeys;
          }
          return acc;
        }, {});
        
        return selectedClassInterfacesByKey;
      });

// Selector - Get Instance Interfaces for selection

const getObject = (objects, itemKey) => objects && objects[itemKey];
const getInstanceApiKey = object => object && object.instanceApiKey;
const getInstanceInterfaceFromApi = (apis, apiKey) => get(apis,[apiKey, 'interfaceKeys', 0]);

const getInstanceInterfacesForSelectedObjectByItemKey = createSelector(
      getObjects,
      getApis,
      getSelection,
      (objects, apis, selection=[]) => {

        const instanceInterfaceKey = selection.reduce((acc,itemKey) => {

          const obj = getObject(objects, itemKey);
          const instanceApiKey = getInstanceApiKey(obj);
          const instanceInterfaceFromApi = getInstanceInterfaceFromApi(apis, instanceApiKey);
          acc[itemKey] = instanceInterfaceFromApi;
          return acc;
        }, {});

        return instanceInterfaceKey;
      });


// When we merge, we want to concat arrays, otherwise use default behaviour
const mergeCustomizer = (objValue, srcValue) => Array.isArray(objValue)? objValue.concat(srcValue):undefined;

export const currentContext = createSelector(
      getSelectedNodeInterfacesByItemKey,
      getClassInterfacesForSelectedObjectsByItemKey,
      getInstanceInterfacesForSelectedObjectByItemKey,
      (nodeInterfaceKeys, classInterfaceKeys, instanceInterfaceKeys) => {
        const supportedInterfacesByItemKey = mergeWith({}, nodeInterfaceKeys, classInterfaceKeys, instanceInterfaceKeys, mergeCustomizer);
        const commonInterfaceKeys = intersection(...Object.values(supportedInterfacesByItemKey));

        commonInterfaceKeys.push(interfaceGlobalKey);
        return commonInterfaceKeys;
      },
);

export const contextInterfaces = createSelector(
      currentContext,
      getInterfaces,
      (interfaceKeys, interfaces) => {
        console.log('contextInterfaces interfaceKeys', interfaceKeys);
        if (!interfaceKeys){
          return [];
        }
        return interfaceKeys.map( k => interfaces[k]);
      });
