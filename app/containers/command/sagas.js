// @flow

import {takeEvery, put, take, fork, cancel} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import shortid from 'shortid';

import {registerCommand} from './private/rich-input/lib/exec';
import * as ActionTypes from './action-types';
import * as CanvasActionTypes from '../canvas/action-types';
import * as Actions from './actions';

// Types

type VoidGenerator = Generator<void, void, void>;

// Code

function* indexMethods(action:Actions.RegisterMethods):Generator<mixed, void, void>{

  action.methods.forEach(m => registerCommand(action.className, m.methodName, m.action));
}

function* createNodeSelector({node, args}){

  let registerNodeSelector = Actions.registerMethods('SVG', [{
    className: 'SVG',
    methodName: `.${node.name}`,
    action : {
      type: CanvasActionTypes.SetSelection,
      nodeKeys: [node.key],
    },
    key: shortid.generate(),
  }]);

  yield put(registerNodeSelector);
}

export default function* commandSaga():VoidGenerator{
  yield takeEvery(ActionTypes.RegisterMethods, indexMethods);
  yield takeEvery(CanvasActionTypes.CreateNode, createNodeSelector)
}
