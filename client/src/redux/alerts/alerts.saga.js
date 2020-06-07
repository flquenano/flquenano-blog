import { v5 as uuid } from "uuid";
import { takeLatest, put, all, call, delay } from "redux-saga/effects";
import alertActions from "./alerts.types";
import { setAlert, removeAlert } from "./alerts.actions";

export function* sendAlert(payload) {
  const id = uuid;
  yield put(setAlert({ ...payload, id }));
  yield delay(2000);
  yield call(removeAlert(id));
}

export function* onSetAlert() {
  yield takeLatest(alertActions.INIT_ALERT, sendAlert);
}

export function* alertSagas() {
  yield all([call(onSetAlert)]);
}
