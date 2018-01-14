// @flow

import {takeEvery, put, take, fork, cancel} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import * as CommandActions from '../command/actions';
import {toast} from 'react-toastify';
import shortid from 'shortid';
import * as ActionTypes from './action-types';
import * as Actions from './actions';

import * as svgInit from '../../modules/svg/container/init';
import * as appInit from './init';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* init(initAction){
  // Register app methods
  let registerAppMethodsAction = CommandActions.registerMethods(appInit.className, appInit.methods);
  yield put({...registerAppMethodsAction});

  // Register methods for SVG
  let registerSvgMethodsAction = CommandActions.registerMethods(svgInit.className, svgInit.methods);
  yield put({...registerSvgMethodsAction});
}

function* executeInstructions(action:Actions.ExecuteInstructions):Generator<mixed, void, void>{
  let executingCommands = [...action.instructions];

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
  yield takeEvery(ActionTypes.ExecuteInstructions, executeInstructions);
  yield takeEvery(ActionTypes.Init, init);
  yield takeEvery(ActionTypes.GlobalError, globalError);
  yield takeEvery(ActionTypes.ThrowError, throwError);
}
