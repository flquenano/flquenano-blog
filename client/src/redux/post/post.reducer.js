import { postAction } from "./post.types";

const INIT_STATE = {
  count: 0,
  posts: [],
  post: {},
  error: ""
};

const postReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case postAction.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        count: action.payload.count
      };
    case postAction.GET_MY_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts
      };
    case postAction.GET_POST_SUCCESS:
      return {
        ...state,
        post: action.payload
      };
    case postAction.GET_MY_POSTS_FAILURE:
    case postAction.GET_POSTS_FAILURE:
    case postAction.GET_POST__FAILURE:
      return {
        ...state,
        count: 0,
        posts: [],
        post: {},
        error: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
