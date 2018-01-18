// @flow


import {takeEvery, put} from 'redux-saga/effects';

import * as AppActionTypes from '../app/action-types';

import * as CommandActions from '../command/actions';

import {api} from './lib/api';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(initAction){

  // Register methods for SVG
  const registerCanvasApiAction = CommandActions.loadApi(api);
  yield put(registerCanvasApiAction);

  
}

export default function* appSaga():VoidGenerator{
  yield takeEvery(AppActionTypes.Init, init);
}
