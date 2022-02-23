import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { borrowedBookApi } from "../../apis";

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
export const getBorrowedBooksByStatus = createAsyncThunk(
  "getBorrowedBooks",
  async (borrowedBookStatus, { rejectWithValue, dispatch }) => {
    try {
      return await borrowedBookApi.getBorrowedBookByStatus(borrowedBookStatus);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getBorrowedBookById = createAsyncThunk(
  "getBorrowedBookById",
  async (borrowedBookId, { rejectWithValue, dispatch }) => {
    try {
      return await borrowedBookApi.getBorrowedBookById(borrowedBookId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBorrowedBookById = createAsyncThunk(
  "updateBorrowedBookById",
  async (borrowedBookId, { rejectWithValue, dispatch }) => {
    try {
      return await borrowedBookApi.updateBorrowedBookById(borrowedBookId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const borrowedBookSlice = createSlice({
  name: "borrowedBooks",
  initialState,
  reducers: {},
  extraReducers: {
    [getBorrowedBooksByStatus.pending](state, action) {
      state.borrowedBooks.loading = true;
      state.borrowedBooks.status = null;
      state.borrowedBooks.msg = "";
    },
    [getBorrowedBooksByStatus.fulfilled](state, action) {
      state.borrowedBooks.loading = false;
      state.borrowedBooks.status = action.payload.status;
      state.borrowedBooks.msg = action.payload.msg;
      state.borrowedBooks.data = action.payload.borrowedBooks;
    },
    [getBorrowedBooksByStatus.rejected](state, action) {
      state.borrowedBooks.loading = false;
      state.borrowedBooks.status = action.payload.status;
      state.borrowedBooks.msg = action.payload.msg;
    },
    [getBorrowedBookById.pending](state, action) {
      state.borrowedBook.loading = true;
      state.borrowedBook.status = null;
      state.borrowedBook.msg = "";
    },
    [getBorrowedBookById.fulfilled](state, action) {
      state.borrowedBook.loading = false;
      state.borrowedBook.status = action.payload.status;
      state.borrowedBook.msg = action.payload.msg;
      state.borrowedBook.data = action.payload.borrowedBookItems;
    },
    [getBorrowedBookById.rejected](state, action) {
      state.borrowedBook.loading = false;
      state.borrowedBook.status = action.payload.status;
      state.borrowedBook.msg = action.payload.msg;
    },
    [updateBorrowedBookById.pending](state, action) {
      state.borrowedBook.loading = true;
      state.borrowedBook.status = null;
      state.borrowedBook.msg = "";
    },
    [updateBorrowedBookById.fulfilled](state, action) {
      state.borrowedBook.loading = false;
      state.borrowedBook.status = action.payload.status;
      state.borrowedBook.msg = action.payload.msg;
      const index = state.borrowedBooks.data.findIndex(
        (ele) => ele._id === action.payload.borrowedBookId
      );
      state.borrowedBooks.data = [
        ...state.borrowedBooks.data.slice(0, index),
        ...state.borrowedBooks.data.slice(index + 1),
      ];
    },
    [updateBorrowedBookById.rejected](state, action) {
      state.borrowedBook.loading = false;
      state.borrowedBook.status = action.payload.status;
      state.borrowedBook.msg = action.payload.msg;
    },
  },
});

const { reducer } = borrowedBookSlice;

export default reducer;
