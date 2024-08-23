// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";
// const store = configureStore({
//   reducer: {
//     // Add reducers here
//     auth: authSlice,
//   },
// });

// export default store;import { configureStore } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Adjust the path if necessary

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
