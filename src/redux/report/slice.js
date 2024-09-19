import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usage: [],
  scores: [],
  selected_score: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState: initialState,
  reducers: {
    setScores: (state, action) => {
      state.scores = action.payload;
    },
    selectScore: (state, action) => {
      state.selected_score = action.payload;
    },
    setUsage: (state, action) => {
      state.usage = action.payload;
    },
  },
});

// Destructure the slice object to access actions and reducer
const { actions: reportActions, reducer: reportReducer } = reportSlice;

export { reportActions, reportReducer };
