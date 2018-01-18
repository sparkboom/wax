// @flow

import {CanvasState} from '../state';
import type {Node} from '../types';

export function* selectChildNodeKeys(canvas:CanvasState):Generator<Node, void, void>{
  for(let key of canvas.selection){
    yield* canvas.nodes[key].childNodeKeys;
  }
}

export function* selectParentKeys(canvas:CanvasState):Generator<Node, void, void>{
  const uniqueKeys = [];
  for(let key of canvas.selection){
    if (uniqueKeys.indexOf(key)<0) {
      yield canvas.nodes[key].parentNodeKey;
      uniqueKeys.push[canvas.nodes[key].parentNodeKey];
    }
  }
}
