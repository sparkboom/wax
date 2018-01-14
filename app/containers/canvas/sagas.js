// @flow

import {takeEvery, put, take, fork, cancel} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {toast} from 'react-toastify';
import shortid from 'shortid';
import * as ActionTypes from './action-types';
import * as AppActionTypes from '../app/action-types';
import * as Actions from './actions';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(initAction){

  // Create the SVG node
  let createSvgAction = Actions.createNode({
    nodeClass: 'SVG:SVG',
    name: 'svg',
    parentKey: 'root',
    args: {},
  });
  yield put(createSvgAction);
}

export default function* appSaga():VoidGenerator{
  yield takeEvery(AppActionTypes.Init, init);
}
