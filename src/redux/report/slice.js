import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usage: {
    currentPage: 0,
    entriesPerPage: 5,
    totalEntries: 5,
    data: [],
  },
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
    setCurrentPage: (state, action) => {
      state.usage.currentPage = action.payload;
    },
    setTotalEntries: (state, action) => {
      state.usage.totalEntries = action.payload;
    },
    setEntriesPerPage: (state, action) => {
      state.usage.entriesPerPage = action.payload;
    },
    setUsage: (state, action) => {
      state.usage.data = [...state.usage.data, ...action.payload];
    },
  },
});

// Destructure the slice object to access actions and reducer
const { actions: reportActions, reducer: reportReducer } = reportSlice;

export { reportActions, reportReducer };
