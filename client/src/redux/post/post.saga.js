import { takeLatest, put, all, call } from "redux-saga/effects";
import { postAction } from "./post.types";

import { getPostsSuccess } from "./post.actions";

export function* getPosts({ payload: page }) {
  try {
    const req = yield fetch(
      `http://localhost:5000/api/v1/posts?page=${page}&sort`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
      }
    );
    const res = yield req.json();
    if (req.status !== 200) {
      throw res;
    }
    yield put(getPostsSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetPosts() {
  yield takeLatest(postAction.GET_POSTS_START, getPosts);
}

export function* postSagas() {
  yield all([call(watchGetPosts)]);
}
