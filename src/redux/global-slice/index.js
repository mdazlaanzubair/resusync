import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.global = action.payload;
    },
  },
});

// Destructure the slice object to access actions and reducer
const { actions: globalActions, reducer: globalReducer } = globalSlice;

export { globalActions, globalReducer };
