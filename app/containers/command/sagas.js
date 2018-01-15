// @flow

import {takeEvery, put} from 'redux-saga/effects';

import shortid from 'shortid';

import * as ActionTypes from './action-types';
import * as AppActionTypes from '../app/action-types';
import * as CanvasActionTypes from '../canvas/action-types';
import * as Actions from './actions';
import * as AppActions from '../app/actions';

import * as AutoComplete from './private/rich-input/lib/auto-complete';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(action):Generator<mixed, void, void>{

}

function* createObjectItem(createItemAction:AppActions.CreateItem):Generator<mixed, void, void>{

  // we need to create an object and item
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
