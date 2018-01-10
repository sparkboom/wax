import appSaga from '../containers/app/sagas';
import svgSaga from '../modules/svg/container/sagas';

import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(svgSaga),
  ]);
}
