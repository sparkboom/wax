import appSaga from '../containers/app/sagas';
import commandSaga from '../containers/command/sagas';
import svgSaga from '../modules/svg/sagas';
import canvasSaga from '../containers/canvas/sagas';

import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(canvasSaga),
    fork(commandSaga),
    fork(svgSaga),
  ]);
}
