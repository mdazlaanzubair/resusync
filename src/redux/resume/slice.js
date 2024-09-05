import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumes: [],
};

const resumeSlice = createSlice({
  name: "resume",
  initialState: initialState,
  reducers: {
    setResumes: (state, action) => {
      state.resumes = action.payload;
    },

    insertResume: (state, action) => {
      state.resumes = [action.payload, ...state.resumes];
    },
  },
});

// Destructure the slice object to access actions and reducer
const { actions: resumeActions, reducer: resumeReducer } = resumeSlice;

export { resumeActions, resumeReducer };
