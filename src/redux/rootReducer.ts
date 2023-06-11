import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//slices
import auth from "./slices/auth.slice";
import control from "./slices/control.slice";
import songs from "./slices/songs.slice";

const authPersistConfig = {
  key: "auth",
  storage,
  keyPrefix: "redux-",
  blacklist: ["isLoggenIn"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  control,
  songs,
});

export default rootReducer;
