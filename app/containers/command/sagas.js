// @flow

import {takeEvery, put, take, fork, cancel} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import shortid from 'shortid';

import * as AutoComplete from './private/rich-input/lib/auto-complete';
import * as ActionTypes from './action-types';
import * as AppActionTypes from '../app/action-types';
import * as CanvasActionTypes from '../canvas/action-types';
import * as Actions from './actions';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(action):Generator<mixed, void, void>{

}

function* loadApi(action:Actions.LoadApi):Generator<mixed, void, void>{

  AutoComplete.loadApi(action.api);
}

function* createNodeSelector({node, args}){

  // Create and load api for the node
}

export default function* commandSaga():VoidGenerator{
  yield takeEvery(AppActionTypes.Init, init);
  yield takeEvery(ActionTypes.LoadApi, loadApi);
  yield takeEvery(CanvasActionTypes.CreateNode, createNodeSelector)
}
