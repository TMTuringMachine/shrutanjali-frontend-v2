import { Slice, createSlice } from "@reduxjs/toolkit";

interface authState {
  isLoggedIn: boolean;
  user: any;
}

const initialState: authState = {
  isLoggedIn: false,
  user: null,
};

const slice: Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess(state, action) {
      state = { ...action.payload, isLoggedIn: true };
      return state;
    },
    loginSuccess(state, action) {
      state = { ...action.payload, isLoggedIn: true };
      return state;
    },
    initialize(state, action) {
      state.user = action.payload;
      return state;
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { registerSuccess, loginSuccess, initialize, logoutSuccess } =
  slice.actions;

export default slice.reducer;
