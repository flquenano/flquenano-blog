import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loadingReducer from "./loading/loading.reducer";
import errorReducer from "./error/error.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "user",
  storage,
  blacklist: ["loading", "error", "success"]
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
  user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
