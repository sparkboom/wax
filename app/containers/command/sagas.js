// @flow

import {takeEvery, put} from 'redux-saga/effects';

import shortid from 'shortid';

import * as ActionTypes from './action-types';
import * as AppActionTypes from '../app/action-types';
import * as CanvasActionTypes from '../canvas/action-types';
import * as Actions from './actions';
import * as AppActions from '../app/actions';
import * as Types from './types';
import * as AutoComplete from './private/rich-input/lib/auto-complete';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(action):Generator<mixed, void, void>{

}

function* createObjectItem(createItemAction:AppActions.CreateItem):Generator<mixed, void, void>{

  // Create an api item, and an object linking to its class interfaces and empty api.
  const {itemKey, object, node} = createItemAction;
  const apiAction = Actions.loadInstanceApi(`${itemKey}-${node.name || node.category || '...'}`, itemKey);
  const createObjectAction = Actions.createObject(itemKey,apiAction.api.api.apiKey,object.classInterfaceKeys);
  yield put(apiAction);
  yield put(createObjectAction);
}

function* loadApi(action:Actions.LoadApi):Generator<mixed, void, void>{

  AutoComplete.loadApi(action.api);
}

// function* createNodeSelector({node, args}){
//
//   // Create and load api for the node
// }

export default function* commandSaga():VoidGenerator{
  yield takeEvery(AppActionTypes.Init, init);
  yield takeEvery(AppActionTypes.CreateItem, createObjectItem);
  yield takeEvery(ActionTypes.LoadApi, loadApi);
  //yield takeEvery(CanvasActionTypes.CreateNode, createNodeSelector)
}
