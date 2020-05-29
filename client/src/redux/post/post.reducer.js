import { postAction } from "./post.types";

const INIT_STATE = {
  count: 0,
  posts: [],
  post: {}
};

const postReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case postAction.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        count: action.payload.count
      };
    case postAction.GET_POST_SUCCESS:
      return {
        ...state,
        post: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
