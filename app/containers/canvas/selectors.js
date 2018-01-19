import {interfaceNodeKey, interfaceParentNodeKey, interfaceChildNodeKey, interfaceGlobalKey} from '../canvas/lib/api';
import {createSelector} from 'reselect';
import mergeWith from 'lodash/mergeWith';
import get from 'lodash/get';
import intersection from 'lodash/intersection';

// Code

// Direct functions

const getNodes = state => state.canvas.nodes;
const getObjects = state => state.command.objects;
const getSelection = state => state.canvas.selection;

// Selector - Get Node Interfaces for selection

export const getTopLevelNodes = createSelector(
      getNodes,
      getObjects,
      getSelection,
      (nodes, objects=[], selection=[]) => {

        const topLevelNodeKeys = nodes.root && nodes.root.childNodeKeys || [];
        const topLevelNodeInfo = topLevelNodeKeys.map( k => ({
            itemKey: k,
            objectClass: get(objects,[k, 'classInterfaceKeys', 0]),
            isSelected: selection.indexOf(k)>=0,
          })
        );

        return topLevelNodeInfo;
      });
