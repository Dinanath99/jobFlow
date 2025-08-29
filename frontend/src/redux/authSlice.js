
// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   loading: false,
//   user: null,
// };


// let initialUser = null;
// try {
//   const storedUser = localStorage.getItem("user");
//   if (storedUser) {
//     initialUser = storedUser !== "undefined" ? JSON.parse(storedUser) : null;
//   }
// } catch (error) {
//   console.error("Failed to parse user from localStorage:", error);
// }

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     ...initialState,
//     user: initialUser,
//   },
//   reducers: {
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//       try {
//         localStorage.setItem("user", JSON.stringify(action.payload));
//       } catch (error) {
//         console.error("Failed to save user to localStorage:", error);
//       }
//     },
//     clearUser: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { setLoading, setUser, clearUser } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
};

let initialUser = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    initialUser = storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  }
} catch (error) {
  console.error("Failed to parse user from localStorage:", error);
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
    user: initialUser,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Failed to save user to localStorage:", error);
      }
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

// Add a selector for isLoggedIn
export const selectIsLoggedIn = (state) => !!state.auth.user;

export const { setLoading, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
