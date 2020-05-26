import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loadingReducer from "./loading/loading.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "user",
  storage,
  blacklist: ["loading"]
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
