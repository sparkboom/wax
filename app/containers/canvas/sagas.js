// @flow

import {takeEvery, put} from 'redux-saga/effects';

import shortid from 'shortid';

import * as ActionTypes from './action-types';
import * as AppActionTypes from '../app/action-types';

import * as Actions from './actions';
import * as AppActions from '../app/actions';
import * as CommandActions from '../command/actions';

import {getName} from './lib/name-generator';
import {api} from './lib/api';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(initAction){

  // Register methods for SVG
  const registerCanvasApiAction = CommandActions.loadApi(api);
  yield put(registerCanvasApiAction);
}

function* createNodeItem(createItemAction:AppActions.CreateItem){

  // For every 'CREATE_ITEM', ensure we have a node object so that it can be selected and placed in a hierarchy
  const {itemKey, node} = createItemAction;
  const createNodeAction = Actions.createNode({
    name: node.name || getName(node.category) || '...',
    nodeItemKey: itemKey,
    parentNodeKey: node.parentNodeKey,
    childNodeKeys: node.childNodeKeys || [],
  });
  yield put(createNodeAction);
}

export default function* appSaga():VoidGenerator{
  yield takeEvery(AppActionTypes.Init, init);
  yield takeEvery(AppActionTypes.CreateItem, createNodeItem);
}
