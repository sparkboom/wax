// @flow

import {takeEvery, put} from 'redux-saga/effects';
import * as CommandActions from '../../containers/command/actions';
import * as CanvasActions from '../../containers/canvas/actions';
import * as ActionTypes from './action-types';
import * as AppActionTypes from '../../containers/app/action-types';
import api from './lib/api';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(initAction){

  // Register methods for SVG
  const svgApi = api();
  let loadSvgApiAction = CommandActions.loadApi(svgApi);
  yield put(loadSvgApiAction);
}

export default function* svgSaga():Generator<void, void, void>{
  yield takeEvery(AppActionTypes.Init, init);
}
