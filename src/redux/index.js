import { configureStore } from "@reduxjs/toolkit";
import { resumeReducer } from "./resume/slice";
import { llmConfigReducer } from "./llm-config/slice";
import { reportReducer } from "./report/slice";

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    llmConfig: llmConfigReducer,
    report: reportReducer,
  },
});
