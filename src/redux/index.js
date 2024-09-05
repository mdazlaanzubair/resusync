import { configureStore } from "@reduxjs/toolkit";
import { resumeReducer } from "./resume/slice";

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
  },
});
