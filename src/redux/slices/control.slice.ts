import { Dispatch, PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
// ----------------------------------------------------------------------

interface snackState {
  text: null | string;
  type: null | "success" | "error" | "warning" | "info";
  timestamp: null | string;
}

interface controlState {
  loading: boolean;
  snack: snackState;
}

const initialState: controlState = {
  loading: false,
  snack: {
    text: null,
    type: null,
    timestamp: null,
  },
};

const slice: Slice = createSlice({
  name: "control",
  initialState,
  reducers: {
    showSnackbar(state, action: PayloadAction<snackState>) {
      switch (action.payload.type) {
        case "success":
          state.snack.text = action.payload?.text || "Success";
          state.snack.type = "success";
          break;
        case "error":
          state.snack.text =
            action.payload?.text || "Unexpected Error Occurred";
          state.snack.type = "error";
          state.snack.timestamp = new Date();
          break;
        case "warning":
          state.snack.text = action.payload?.text;
          state.snack.type = "warning";
          break;
        case "info":
          state.snack.text = action.payload?.text;
          state.snack.type = "info";
          break;
        default:
          state.snack.text =
            action.payload?.text || "Unexpected Error Occurred";
          state.snack.type = "error";
          break;
      }
      return state;
    },
    hideSnackbar: (state) => {
      state.snack.text = null;
      state.snack.type = null;
      return state;
    },
    startLoading(state) {
      state.loading = true;
      return state;
    },
    stopLoading(state) {
      state.loading = false;
      return state;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hideSnackbar, startLoading, stopLoading, showSnackbar } =
  slice.actions;
