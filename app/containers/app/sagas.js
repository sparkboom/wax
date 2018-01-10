// @flow

import {takeEvery, put, take, fork, cancel} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {EXECUTE_COMMAND} from './action-types';
import {filterTokens} from '../command/actions';
import type {ExecuteCommandAction} from './types';
import { toast } from 'react-toastify';
import shortid from 'shortid';

function* executeCommands(action:ExecuteCommandAction) : Generator<mixed, void, void>{
  let executingCommands = [...action.commands];

  for(let cmd of executingCommands){
    yield put({...cmd.action, key: shortid.generate() });
    yield put({ ...filterTokens({key:cmd.key}) });
    yield delay(200);
  }
}

function* globalError(action){
  try{
    toast.error(action.message);
  }
  catch(err){
    console.error(err);
  }
}

function* throwError(action){
  console.log('throw error');
  throw new Error('This is a deliberately thrown error!');
}

export default function* appSaga() : Generator<void, void, void>{
  yield takeEvery(EXECUTE_COMMAND, executeCommands);
  yield takeEvery('GLOBAL:ERROR', globalError);
  yield takeEvery('GLOBAL:THROW_ERROR', throwError);
}
