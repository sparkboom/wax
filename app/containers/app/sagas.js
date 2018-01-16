// @flow

import {takeEvery, put, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {toast} from 'react-toastify';
import shortid from 'shortid';
import * as ActionTypes from './action-types';
import * as CanvasActionTypes from '../canvas/action-types';
import * as Actions from './actions';
import * as CommandActions from '../command/actions';

import api from './lib/api';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(initAction){

  // Register App methods
  const appApi = api();
  const loadAppApiAction = CommandActions.loadApi(appApi);
  yield put(loadAppApiAction);
}

function* executeInstructions(action:Actions.ExecuteInstructions):Generator<mixed, void, void>{
  let executingCommands = [...action.instructions];

  for(let cmd of executingCommands){
    yield put({...cmd.method.action });
    yield put({...CommandActions.filterTokens({commandKey: cmd.commandKey}) });
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
  throw new Error('This is a deliberately thrown error!');
}

export default function* appSaga():VoidGenerator{
  yield takeEvery(ActionTypes.ExecuteInstructions, executeInstructions);
  yield takeEvery(ActionTypes.Init, init);
  yield takeEvery(ActionTypes.GlobalError, globalError);
  yield takeEvery(ActionTypes.ThrowError, throwError);
}
