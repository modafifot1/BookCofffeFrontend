import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarCollapsed: false,
};

export const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    toggleSideBar(state, action) {
      state.isSideBarCollapsed = !state.isSideBarCollapsed;
    },
  },
});

const { actions, reducer: controlReducer } = controlSlice;
export const { toggleSideBar } = actions;
export default controlReducer;
