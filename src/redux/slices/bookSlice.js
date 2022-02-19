import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookApi } from "../../apis";

const initialState = {
  books: {
    data: [],
    loading: false,
    msg: "",
    totalPage: null,
  },
  book: {
    data: {
      _id: "",
      title: "",
      author: "",
      yearOfPublication: null,
      rating: null,
      quantity: null,
    },
    loading: false,
    msg: "",
  },
};
export const getBooks = createAsyncThunk(
  "/getBooks",
  async (query, { rejectWithValue, dispatch }) => {
    try {
      return await bookApi.getListBook(query);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getBookById = createAsyncThunk(
  "/getBook",
  async (bookId, { rejectWithValue, dispatch }) => {
    try {
      return await bookApi.getBookById(bookId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createBook = createAsyncThunk(
  "/createBook",
  async (book, { rejectWithValue, dispatch }) => {
    try {
      return await bookApi.createBook(book);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBookById = createAsyncThunk(
  "/updateBook",
  async (book, { rejectWithValue, dispatch }) => {
    try {
      return await bookApi.updateBookById(book._id, book);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "/deleteBook",
  async (bookId, { rejectWithValue, dispatch }) => {
    try {
      return await bookApi.deleteBook(bookId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    onBookContentChange(state, action) {
      state.book.data = {
        ...state.book.data,
        [action.payload[0]]: action.payload[1],
      };
      console.log("State: ", action.payload);
    },
    resetBookState(state, action) {
      console.log("ssdsd");
      state.book.data = {
        _id: "",
        title: "",
        author: "",
        yearOfPublication: null,
        rating: null,
        quantity: null,
      };
    },
  },
  extraReducers: {
    [getBooks.pending](state, action) {
      state.books.loading = true;
      state.books.error = null;
      state.books.status = null;
    },
    [getBooks.rejected](state, action) {
      state.books.loading = false;
      state.books.msg = action.payload.msg;
      state.books.status = action.payload.status;
    },
    [getBooks.fulfilled](state, action) {
      state.books.msg = null;
      state.books.loading = false;
      state.books.data = action.payload.books;
      state.books.status = action.payload.status;
      state.books.msg = action.payload.msg;

      state.books.totalPage = action.payload.totalPage;
    },
    [getBookById.pending](state, action) {
      state.book.loading = true;
      state.book.msg = "";
      state.book.status = null;
    },
    [getBookById.fulfilled](state, action) {
      state.book.data = action.payload.book;
      state.book.loading = false;
      state.book.msg = action.payload.msg;
      state.book.status = action.payload.status;
    },
    [getBookById.rejected](state, action) {
      state.book.loading = false;
      state.book.msg = action.payload.msg;
      state.book.status = action.payload.status;
    },
    [createBook.pending](state, action) {
      state.book.status = null;
      state.book.loading = true;
      state.book.msg = null;
    },
    [createBook.rejected](state, action) {
      state.book.status = action.payload.status;
      state.book.loading = false;
      state.book.msg = action.payload.msg;
    },
    [createBook.fulfilled](state, action) {
      state.book.loading = false;
      state.book.data = action.payload.book;
      state.book.msg = action.payload.msg;
      state.book.status = action.payload.status;
    },
    [updateBookById.pending](state, action) {
      state.book.loading = true;
      state.book.status = null;
      state.book.error = null;
    },
    [updateBookById.rejected](state, action) {
      state.book.loading = false;
      state.book.msg = action.payload.msg;
      state.book.status = action.payload.status;
    },
    [updateBookById.fulfilled](state, action) {
      state.book.loading = false;
      state.book.status = action.payload.status;
      state.book.msg = action.payload.msg;
      const newBook = action.payload.food;
      const foodIndex = state.products.findIndex(
        (ele) => ele._id === newBook._id
      );
      state.products[foodIndex] = newBook;
    },
    [deleteBook.pending](state, action) {
      state.book.loading = true;
      state.book.msg = null;
      state.book.status = null;
    },
    [deleteBook.rejected](state, action) {
      state.book.loading = false;
      state.book.msg = action.payload.msg;
      state.book.status = action.payload.status;
    },
    [deleteBook.fulfilled](state, action) {
      state.book.loading = false;
      state.book.msg = action.payload.msg;
      state.status = action.payload.status;
      state.books = state.books.filter(
        (ele) => ele._id !== action.payload.bookId
      );
    },
  },
});

const { reducer, actions } = bookSlice;
export const { onBookContentChange, resetBookState } = actions;
export default reducer;
