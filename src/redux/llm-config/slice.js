import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  llmConfigs: {},
};

const llmConfigSlice = createSlice({
  name: "llmConfig",
  initialState: initialState,
  reducers: {
    setLLMConfigs: (state, action) => {
      state.llmConfigs = action.payload;
    },
  },
});

// Destructure the slice object to access actions and reducer
const { actions: llmConfigActions, reducer: llmConfigReducer } = llmConfigSlice;

export { llmConfigActions, llmConfigReducer };
