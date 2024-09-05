import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./global-slice";
import { resumeReducer } from "./resume/slice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    resume: resumeReducer,
  },
});
