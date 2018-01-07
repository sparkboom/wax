import appSaga from '../containers/app/sagas';
import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  console.log('rootSaga');
  yield all([
    fork(appSaga),
  ]);
}
