// @flow

import {takeEvery, put, select} from 'redux-saga/effects';

import {getName} from '../../lib/name-generator';

import * as AppActionTypes from '../../containers/app/action-types';

import * as Actions from './actions';
import * as CommandActions from '../../containers/command/actions';
import * as AppActions from '../../containers/app/actions';
import * as CanvasActions from '../../containers/canvas/actions';
import api, {interfaceSvgKey, interfaceSvgShapeKey} from './lib/api';
import shortid from 'shortid';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(initAction){

  let loadSvgApiAction = CommandActions.loadApi(api);
  yield put(loadSvgApiAction);

  // Create Svg item by default
  let createSvgction = {
    type:'ALL:CREATE_ITEM',
    parentItemKey: ['root'],
    itemKey: shortid.generate(),
    name: 'svg',
    class: interfaceSvgKey,
  };
  yield put(createSvgction);

  const selectCanvasAction = CanvasActions.selectNodes([createSvgction.itemKey]);
  yield put(selectCanvasAction);
}

function* willCreateShape(willCreateShapection){
  const state = yield select();

  if (state.canvas.selection.length===1){
    const{type, ...properties} = willCreateShapection;

    let createShapection = {
      type:'ALL:CREATE_ITEM',
      parentItemKey: state.canvas.selection[0],
      itemKey: shortid.generate(),
      name: getName(willCreateShapection.shape),
      class: interfaceSvgShapeKey,
      properties,
    };
    yield put(createShapection);

  }else{

    //failure steps
  }
}

export default function* svgSaga():Generator<void, void, void>{
  yield takeEvery(AppActionTypes.Init, init);
  yield takeEvery('SVG:WILL_CREATE_SHAPE', willCreateShape);
}
