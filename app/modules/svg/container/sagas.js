import {takeEvery, put} from 'redux-saga/effects';

function* addShape(action){
  //Naturally make every shape action successful.
  //const successAction = {...action, type: `EXECUTE_SUCCESS`};
  //yield put(successAction);
  console.log('action', action);
  //yield put({'APP:CREATE_NODE'});
}

export default function* svgSaga():Generator<void, void, void>{
  yield takeEvery('SVG:ADD_SHAPE', addShape);
}
