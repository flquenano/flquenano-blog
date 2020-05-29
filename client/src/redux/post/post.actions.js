import { postAction } from "./post.types";

export const getPostsStart = (page) => ({
  type: postAction.GET_POSTS_START,
  payload: page
});

export const getPostsSuccess = (posts) => ({
  type: postAction.GET_POSTS_SUCCESS,
  payload: posts
});
