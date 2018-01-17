// @flow

import {takeEvery, put, select} from 'redux-saga/effects';

import shortid from 'shortid';

import * as ActionTypes from './action-types';
import * as AppActionTypes from '../app/action-types';
import * as CanvasActionTypes from '../canvas/action-types';
import * as Actions from './actions';
import * as AppActions from '../app/actions';
import * as CanvsActions from '../canvas/actions';
import * as Types from './types';
import * as AutoComplete from './private/rich-input/lib/auto-complete';
import get from 'lodash/get';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(action):Generator<mixed, void, void>{

}

function instanceIterfaceKeyForItemKey(itemKey:string, state) {

  const apiKey = get(state,`command.objects[${itemKey}].instanceApiKey`);
  const interfaceKey = get(state,`command.apis[${apiKey}].interfaceKeys[0]`);
  return interfaceKey;
}
function* createObjectAndApi(createItemAction:AppActions.CreateItem){

  const {object, itemKey, item} = createItemAction;

    // Create api for object
    const apiAction = Actions.loadInstanceApi(`${itemKey}-${item.moduleKey}-${item.classKey}'}`, itemKey);
    yield put(apiAction);

    const state = yield select();

    // Create object for item

    const createObjectAction = Actions.createObject(itemKey, get(apiAction, 'api.api.apiKey'), object.classInterfaceKeys);
    yield put(createObjectAction);

}

function* createParentSelector(createNodeAction:CanvsActions.CreateNode){

  const {nodeItemKey, name, parentNodeKey} = createNodeAction;

  // Create method in parent's api to select it
  if (!!parentNodeKey && parentNodeKey!=='root'){

    const state = yield select();
    debugger;
    const interfaceKey = instanceIterfaceKeyForItemKey(parentNodeKey, state);
    const methodAction = CanvsActions.selectNodes([nodeItemKey])
    const apiParentAction = Actions.createMethod(interfaceKey, name, methodAction);
    yield put(apiParentAction);
  }
}

function* loadApi(action:Actions.LoadApi):Generator<mixed, void, void>{

  AutoComplete.loadApi(action.api);
}

export default function* commandSaga():VoidGenerator{
  yield takeEvery(AppActionTypes.Init, init);
  yield takeEvery(AppActionTypes.CreateItem, createObjectAndApi);
  yield takeEvery(CanvasActionTypes.CreateNode, createParentSelector);
  yield takeEvery(ActionTypes.LoadApi, loadApi);
}
