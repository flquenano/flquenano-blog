import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loadingReducer from "./flags/loading/loading.reducer";
import errorReducer from "./flags/error/error.reducer";
import userReducer from "./user/user.reducer";
import postReducer from "./post/post.reducer";
const persistConfig = {
  key: "user",
  storage,
  blacklist: ["loading", "error", "post"]
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
  user: userReducer,
  post: postReducer
});

export default persistReducer(persistConfig, rootReducer);
