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

function* indexApi(action:Actions.LoadApi):Generator<mixed, void, void>{

  action.api.api.interfaceKeys.forEach( iKey => {
    const iface = action.api.interfaces.find( i => i.interfaceKey === iKey);
    iface && iface.methodKeys.forEach( mKey => {
      const method = action.api.methods.find( i => i.interfaceKey === iKey);
      method && registerCommand(iface, method.methodName, method.action);
    })
  });
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
  yield takeEvery(ActionTypes.LoadApi, indexApi);
  yield takeEvery(CanvasActionTypes.CreateNode, createNodeSelector)
}
