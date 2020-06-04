import {
  takeLatest,
  put,
  all,
  call,
  race,
  take,
  delay
} from "redux-saga/effects";
import { postAction } from "./post.types";
import {
  getPostsSuccess,
  getPostsFailure,
  getMyPostsStart,
  getMyPostsSuccess,
  getMyPostsFailure,
  removePostSuccess,
  removePostFailure,
  getPostSuccess,
  getPostFailure,
  editPostSuccess,
  editPostFailure
} from "./post.actions";
import { post, get, patch, remove } from "../../util/fetch/fetch.util";
import history from "../../history";

export function* getPost({ payload: id }) {
  try {
    const req = yield get(`posts/${id}`);
    if (req.status === 404) forwardTo("/blog/404");
    const res = yield req.json();
    console.log(res);
    if (!req.ok) throw res;
    yield put(getPostSuccess(res));
  } catch (error) {
    yield put(getPostFailure(error));
  }
}

export function* getPosts(page) {
  const req = yield get(`posts?page=${page}&sort`);
  const res = yield req.json();
  if (req.status !== 200) {
    throw res;
  }
  return res.data;
}

export function* getPostsRace({ payload: page }) {
  try {
    const { posts } = yield race({
      posts: call(getPosts, page),
      cancel: take(postAction.GET_POSTS_CANCEL)
    });
    if (posts) {
      yield put(getPostsSuccess(posts));
    }
  } catch (error) {
    yield put(getPostsFailure(error));
  }
}

export function* getMyPosts() {
  const req = yield get("posts/my-posts");
  const res = yield req.json();
  if (!req.ok) {
    throw res;
  }
  return res.data;
}

export function* getMyPostsRace() {
  try {
    const { posts } = yield race({
      posts: call(getMyPosts),
      cancel: take(postAction.GET_MY_POSTS_CANCEL)
    });
    if (posts) yield put(getMyPostsSuccess(posts));
  } catch (error) {
    yield put(getMyPostsFailure(error));
  }
}

export function* removePost({ payload: id }) {
  try {
    const req = yield call(remove, `posts/${id}`);
    const res = yield req.json();
    if (!req.ok) throw res;
    yield put(removePostSuccess());
    yield put(getMyPostsStart());
  } catch (error) {
    yield put(removePostFailure(error));
  }
}

export function* editPost({ payload }) {
  try {
    const { id, body } = payload;

    const req = yield patch(`posts/${id}`, body);
    const res = yield req.json();
    if (!req.ok) throw res;
    yield put(editPostSuccess());
    // yield delay(2000);
    // console.log(res);
    // forwardTo(`/blog/posts/${res.title.replace(/\s/g, "-")}-${res._id}`);
  } catch (error) {
    yield put(editPostFailure(error));
  }
}

export function* watchEditPost() {
  yield takeLatest(postAction.EDIT_POST_START, editPost);
}
export function* watchRemovePost() {
  yield takeLatest(postAction.REMOVE_POST_START, removePost);
}
export function* watchGetMyPosts() {
  yield takeLatest(postAction.GET_MY_POSTS_START, getMyPostsRace);
}
export function* watchGetPosts() {
  yield takeLatest(postAction.GET_POSTS_START, getPostsRace);
}
export function* watchGetPost() {
  yield takeLatest(postAction.GET_POST_START, getPost);
}

export function* postSagas() {
  yield all([
    call(watchGetPosts),
    call(watchGetMyPosts),
    call(watchRemovePost),
    call(watchGetPost),
    call(watchEditPost)
  ]);
}

function forwardTo(location) {
  history.push(location);
}

// ("call: argument of type {context, fn} has undefined or null `fn`");
