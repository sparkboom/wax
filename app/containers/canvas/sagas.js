// @flow

import {takeEvery, put, take, fork, cancel} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {toast} from 'react-toastify';
import shortid from 'shortid';
import * as ActionTypes from './action-types';
import * as AppActionTypes from '../app/action-types';
import * as Actions from './actions';
import * as CommandActions from '../command/actions';
import api from './lib/api';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(initAction){

  const canvasApi = api();

  // Register methods for SVG
  let registerCanvasApiAction = CommandActions.loadApi(canvasApi);
  yield put(registerCanvasApiAction);

  // Create the SVG node
  // let createSvgAction = Actions.createNode({
  //   nodeClass: 'SVG:SVG',
  //   name: 'svg',
  //   parentKey: 'root',
  //   args: {},
  // });
  // yield put(createSvgAction);
}

export default function* appSaga():VoidGenerator{
  yield takeEvery(AppActionTypes.Init, init);
}
