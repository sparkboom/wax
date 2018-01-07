import appSaga from '../containers/app/sagas';
import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    fork(appSaga),
  ]);
}
