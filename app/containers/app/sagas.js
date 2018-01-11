// @flow

import {takeEvery, put, take, fork, cancel} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import * as CommandActions from '../command/actions';
import {toast} from 'react-toastify';
import shortid from 'shortid';
import * as ActionTypes from './action-types';
import * as Actions from './actions';

// types

type VoidGenerator = Generator<void, void, void>;

// Code

function* executeCommands(action:Actions.ExecuteCommand):Generator<mixed, void, void>{
  let executingCommands = [...action.commands];

  for(let cmd of executingCommands){
    yield put({...cmd.action, key: shortid.generate() });
    yield put({ ...CommandActions.filterTokens({key:cmd.key}) });
    yield delay(200);
  }
}

function* globalError(action):VoidGenerator{
  try{
    toast.error(action.message);
  }
  catch(err){
    console.error(err);
  }
}

function* throwError(action):VoidGenerator{
  console.log('throw error');
  throw new Error('This is a deliberately thrown error!');
}

export default function* appSaga():VoidGenerator{
  yield takeEvery(ActionTypes.ExecuteCommand, executeCommands);
  yield takeEvery(ActionTypes.GlobalError, globalError);
  yield takeEvery(ActionTypes.ThrowError, throwError);
}
