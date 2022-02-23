import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statisticApi } from "../../apis/statisticApi";

const initialState = {
  revenuesInfo: {
    revenues: [],
    loading: false,
    msg: "",
    status: null,
  },
  generalInfo: {
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenues: 0,
    popularFoods: [],
    popularBorrowedBooks: [],
    loading: false,
    msg: "",
    status: null,
  },
};

export const getRevenuesInfo = createAsyncThunk(
  "getRevenueInfo",
  async (getInfoBy, { rejectWithValue, dispatch }) => {
    try {
      console.log("ddd", getInfoBy);
      return await statisticApi.getRevenuesInfo(getInfoBy);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getGeneralInfo = createAsyncThunk(
  "getGeneralInfo",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await statisticApi.getGeneralInfo();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {},
  extraReducers: {
    [getRevenuesInfo.pending](state, action) {
      state.revenuesInfo.loading = true;
      state.revenuesInfo.msg = "";
      state.revenuesInfo.status = null;
    },
    [getRevenuesInfo.fulfilled](state, action) {
      state.revenuesInfo.loading = false;
      state.revenuesInfo.msg = action.payload.msg;
      state.revenuesInfo.status = action.payload.status;
      state.revenuesInfo.revenues = action.payload.revenues;
    },
    [getRevenuesInfo.rejected](state, action) {
      state.revenuesInfo.loading = false;
      state.revenuesInfo.msg = action.payload?.msg;
      state.revenuesInfo.status = action.payload?.status;
    },
    [getGeneralInfo.pending](state, action) {
      state.generalInfo.loading = true;
      state.generalInfo.msg = "";
      state.generalInfo.status = null;
    },
    [getGeneralInfo.fulfilled](state, action) {
      state.generalInfo.loading = false;
      state.generalInfo.msg = action.payload.msg;
      state.generalInfo.status = action.payload.status;
      state.generalInfo.totalOrders = action.payload.totalOrders;
      state.generalInfo.totalCustomers = action.payload.totalCustomers;
      state.generalInfo.totalRevenues = action.payload.totalRevenues;
      state.generalInfo.popularFoods = action.payload.popularFoods;
      state.generalInfo.popularBorrowedBooks =
        action.payload.popularBorrowedBooks;
    },
    [getGeneralInfo.rejected](state, action) {
      state.generalInfo.loading = false;
      state.generalInfo.msg = action.payload?.msg;
      state.generalInfo.status = action.payload?.status;
    },
  },
});

const { reducer } = statisticSlice;
export default reducer;
