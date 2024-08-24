// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";
// const store = configureStore({
//   reducer: {
//     // Add reducers here
//     auth: authSlice,
//   },
// });

// export default store;
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice"; // Adjust the path if necessary
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import companySlice from "./companySlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
