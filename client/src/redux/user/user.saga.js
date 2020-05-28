import Cookies from "js-cookie";
import { takeLatest, put, all, call } from "redux-saga/effects";

import { userAction } from "./user.types";

import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  registerStart,
  registerFailure
} from "./user.actions";

const api = (url) => fetch(url);

export function* loginWithEmail({
  payload: {
    credentials: { email, password }
  }
}) {
  try {
    const req = yield fetch("http://localhost:5000/api/v1/user/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email, password })
    });
    const res = yield req.json();
    if (req.status !== 200) {
      yield put(loginFailure(res.message));
    }
    Cookies.set("token", res.token);
    yield put(
      loginSuccess({ name: res.user.name, privilege: res.user.privilege })
    );
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export function* onEmailLoginStart() {
  yield takeLatest(userAction.EMAIL_LOGIN_START, loginWithEmail);
}

export function* userSagas() {
  yield all([call(onEmailLoginStart)]);
}
