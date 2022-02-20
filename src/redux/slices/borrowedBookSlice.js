import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  borrowedBooks: {
    data: [],
    loading: false,
    status: null,
    msg: "",
  },
  borrowedBook: {
    data: [],
    status: null,
    msg: "",
    loading: false,
  },
};
const borrowedBookSlice = createSlice({
  name: "borrowedBooks",
  initialState,
  reducers: {},
  extraReducers: {},
});

const { reducer } = borrowedBookSlice;

export default reducer;
