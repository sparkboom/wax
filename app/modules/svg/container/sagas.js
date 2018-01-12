import {takeEvery, put} from 'redux-saga/effects';

const nameTally = {};

function* addShape(action){
  //Naturally make every shape action successful.
  if (nameTally[action.shape]){
    nameTally[action.shape] += 1;
  }else {
    nameTally[action.shape] = 1;
  }

  const createNodeAction = {
    type:'APP:CREATE_NODE', key:action.key,
    name:`${action.shape}${nameTally[action.shape]}`,
  };

  yield put(createNodeAction);
}

export default function* svgSaga():Generator<void, void, void>{
  yield takeEvery('SVG:ADD_SHAPE', addShape);
}
