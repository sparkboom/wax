// @flow

import {takeEvery, put, take, fork, cancel} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {registerCommand} from './private/rich-input/lib/exec';
import * as ActionTypes from './action-types';
import * as Actions from './actions';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* indexMethods(action:Actions.RegisterMethods):Generator<mixed, void, void>{

  action.methods.forEach(m => registerCommand(action.className, m.methodName, m.action));
}

export default function* commandSaga():VoidGenerator{
  yield takeEvery(ActionTypes.RegisterMethods, indexMethods);
}
 
