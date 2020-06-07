import { postAction } from "./post.types";

// Posts
export const getPostsStart = (page) => ({
  type: postAction.GET_POSTS_START,
  payload: page
});
export const getPostCancel = () => ({
  type: postAction.GET_POSTS_CANCEL
});
export const getPostsSuccess = (posts) => ({
  type: postAction.GET_POSTS_SUCCESS,
  payload: posts
});
export const getPostsFailure = (error) => ({
  type: postAction.GET_POST_FAILURE,
  payload: error
});

// My_Posts
export const getMyPostsStart = () => ({
  type: postAction.GET_MY_POSTS_START
});
export const getMyPostsCancel = () => ({
  type: postAction.GET_MY_POSTS_CANCEL
});
export const getMyPostsSuccess = (posts) => ({
  type: postAction.GET_MY_POSTS_SUCCESS,
  payload: posts
});
export const getMyPostsFailure = (error) => ({
  type: postAction.GET_MY_POST_FAILURE,
  payload: error
});

// Remove_Posts
export const removePostStart = (id) => ({
  type: postAction.REMOVE_POST_START,
  payload: id
});
export const removePostSuccess = () => ({
  type: postAction.REMOVE_POST_SUCCESS
});
export const removePostFailure = (error) => ({
  type: postAction.REMOVE_POST_FAILURE,
  payload: error
});

// Edit_Post
export const editPostStart = (post) => ({
  type: postAction.EDIT_POST_START,
  payload: post
});
export const editPostSuccess = () => ({
  type: postAction.EDIT_POST_SUCCESS
});
export const editPostFailure = (error) => ({
  type: postAction.EDIT_POST_FAILURE,
  payload: error
});

// Get_Post
export const getPostStart = (id) => ({
  type: postAction.GET_POST_START,
  payload: id
});
export const getPostSuccess = (post) => ({
  type: postAction.GET_POST_SUCCESS,
  payload: post
});
export const getPostFailure = (error) => ({
  type: postAction.GET_POST_FAILURE,
  payload: error
});

// Add_Post
export const addPostStart = (post) => ({
  type: postAction.ADD_POST_START,
  payload: post
});
export const addPostSuccess = () => ({
  type: postAction.ADD_POST_SUCCESS
});
export const addPostFailure = (error) => ({
  type: postAction.ADD_POST_FAILURE,
  payload: error
});
