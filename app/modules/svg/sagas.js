// @flow

import {takeEvery, put} from 'redux-saga/effects';

import * as AppActionTypes from '../../containers/app/action-types';

import * as Actions from './actions';
import * as CommandActions from '../../containers/command/actions';
import * as AppActions from '../../containers/app/actions';
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

function* createSvgItem(createItemAction:AppActions.CreateItem){

  if (createItemAction.item.moduleKey !== 'svg'){
    return;
  }

  if(createItemAction.item.classKey === 'shape'){
    const createShapeAction = Actions.createShape(createItemAction.itemKey, createItemAction.item.properties.shape);
    yield put(createShapeAction);
  }
}

export default function* svgSaga():Generator<void, void, void>{
  yield takeEvery(AppActionTypes.Init, init);
  yield takeEvery(AppActionTypes.CreateItem, createSvgItem);
}
