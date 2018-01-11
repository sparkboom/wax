import {takeEvery, put} from 'redux-saga/effects';

const nameTally = {};

function* addShape(action){
  //Naturally make every shape action successful.
  //const successAction = {...action, type: `EXECUTE_SUCCESS`};
  //yield put(successAction);
  console.log('action', action);
  if (nameTally[action.shape]){
    nameTally[action.shape] += 1;
  }else {
    nameTally[action.shape] = 1;
  }
  yield put({
    type:'APP:CREATE_NODE', key:action.key,
    name:`${action.shape}${nameTally[action.shape]}`,
  });
}

export default function* svgSaga():Generator<void, void, void>{
  //yield takeEvery('SVG:ADD_SHAPE', addShape);
}
