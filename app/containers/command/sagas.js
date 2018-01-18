// @flow

import {takeEvery, put, select} from 'redux-saga/effects';

import * as ActionTypes from './action-types';
import * as AppActionTypes from '../app/action-types';
import * as Actions from './actions';
import * as AutoComplete from './private/rich-input/lib/auto-complete';

// Code

function* init(action):Generator<mixed, void, void>{

}

function* createObject(createObjectAction:Actions.CreateObject):Generator<mixed, void, void>{

  const {itemKey, name, parentItemKey} = createObjectAction;

  // TODO: in future  generate this in reselect?
  // $FlowFixMe
  AutoComplete.loadApi({
    api: {
      interfaceKeys:[itemKey]
    },
    interfaces:[{
      interfaceKey:itemKey,
      interfaceName:name,
      methodKeys:[itemKey],
    }],
    methods:[]
  });

  const state = yield select();
  // $FlowFixMe
  const parentInterface = state.command.interfaces[parentItemKey];
  AutoComplete.indexMethod(parentInterface, name, itemKey);
}

function* loadApi(action:Actions.LoadApi):Generator<mixed, void, void>{

  AutoComplete.loadApi(action.api);
}

export default function* commandSaga():Generator<void, void, void>{
  yield takeEvery(AppActionTypes.Init, init);
  yield takeEvery(ActionTypes.LoadApi, loadApi);
  yield takeEvery(ActionTypes.CreateObject, createObject);
}
