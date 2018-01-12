import {takeEvery, put} from 'redux-saga/effects';
import * as CanvasActions from '../../../containers/canvas/actions';
import * as ActionTypes from './action-types';

const nameTally = {};

function* addShape(action){
  //Naturally make every shape action successful.
  if (nameTally[action.shape]){
    nameTally[action.shape] += 1;
  }else {
    nameTally[action.shape] = 1;
  }

  const createNodeAction = CanvasActions.createNode({
    key: action.key,
    name: `${action.shape}${nameTally[action.shape]}`,
  });

  yield put({...createNodeAction});
}

export default function* svgSaga():Generator<void, void, void>{
  yield takeEvery(ActionTypes.AddShape, addShape);
}
