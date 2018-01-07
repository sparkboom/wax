// @flow

import {takeEvery, put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {EXECUTE_COMMAND} from './action-types';
import {removeTokens} from '../command/actions';
import type {ExecuteCommandAction} from './types';

function* executeCommand(action:ExecuteCommandAction) : Generator<mixed, void, void>{
  let executingCommands = [...action.commands];

  for(let cmd of executingCommands){
    yield put({...cmd.action});
    yield put({...removeTokens([0])});
    yield delay(200);
  }
}

export default function* appSaga() : Generator<void, void, void>{
  yield takeEvery(EXECUTE_COMMAND, executeCommand);
}
