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

    updateResume: (state, action) => {
      state.resumes = state.resumes?.map((resume) => {
        if (resume?.id === action.payload?.id) {
          return action.payload;
        } else {
          return resume;
        }
      });
    },

    deleteResume: (state, action) => {
      state.resumes = state.resumes?.filter(
        (resume) => resume?.id !== action.payload?.id
      );
    },
  },
});

// Destructure the slice object to access actions and reducer
const { actions: resumeActions, reducer: resumeReducer } = resumeSlice;

export { resumeActions, resumeReducer };
