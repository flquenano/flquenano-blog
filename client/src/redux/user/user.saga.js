import Cookies from "js-cookie";
import { takeLatest, take, put, all, call, delay } from "redux-saga/effects";
import { userAction } from "./user.types";
import history from "../../history";

import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  registerStart,
  registerFailure
} from "./user.actions";
import { post, get, patch, remove } from "../../util/fetch/fetch.util";

export function* authorize(req) {
  const res = yield req.json();
  if (!req.ok) {
    throw res;
  }
  Cookies.set("token", res.token);
  yield put(
    loginSuccess({ name: res.user.name, privilege: res.user.privilege })
  );
  yield history.push("/blog/dashboard");
}

export function* login({ payload }) {
  try {
    const req = yield call(post, "user/login", payload);
    yield call(authorize, req);
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export function* register({ payload }) {
  try {
    const req = yield call(post, "user/register", payload);
    yield call(authorize, req);
  } catch (error) {
    yield put(registerFailure(error));
  }
}

export function* logout() {
  Cookies.remove("token");
  yield put(logoutSuccess());
  yield call(forwardTo, "/blog");
}

function* watchRegister() {
  yield takeLatest(userAction.REGISTER_START, register);
}
function* watchLogin() {
  yield takeLatest(userAction.LOGIN_START, login);
}
function* watchLogout() {
  yield takeLatest(userAction.LOGOUT_START, logout);
}

export function* userWatchers() {
  yield all([call(watchLogin), call(watchRegister), call(watchLogout)]);
}

function forwardTo(location) {
  history.push(location);
}
