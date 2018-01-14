import appSaga from '../containers/app/sagas';
import commandSaga from '../containers/command/sagas';
import svgSaga from '../modules/svg/container/sagas';

import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(commandSaga),
    fork(svgSaga),
  ]);
}
