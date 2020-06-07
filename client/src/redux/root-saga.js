import { all, call } from "redux-saga/effects";

import { userWatchers } from "./user/user.saga";
import { postSagas } from "./post/post.saga";
import { alertSagas } from "./alerts/alerts.saga";

export default function* rootSaga() {
  yield all([call(userWatchers), call(postSagas), call(alertSagas)]);
}
