import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApi } from "../../apis/orderApi";

export const getOrdersByStatus = createAsyncThunk(
  "get/orders/status",
  async (orderStatus, { rejectWithValue, dispatch }) => {
    try {
      return await orderApi.getOrdersByStatus(orderStatus);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "get/order",
  async (orderId, { rejectWithValue, dispatch }) => {
    try {
      return await orderApi.getOrderById(orderId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderById = createAsyncThunk(
  "update/order",
  async (orderId, { rejectWithValue, dispatch }) => {
    try {
      return await orderApi.updateOrderById(orderId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  orders: {
    data: [],
    status: null,
    loading: false,
    msg: "",
  },
  order: {
    data: [],
    status: null,
    msg: "",
    loading: false,
  },
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [getOrdersByStatus.pending](state, action) {
      state.orders.loading = true;
      state.orders.status = null;
      state.orders.msg = "";
    },
    [getOrdersByStatus.fulfilled](state, action) {
      state.orders.loading = false;
      state.orders.status = action.payload.status;
      state.orders.msg = action.payload.msg;
      state.orders.data = action.payload.orders;
    },
    [getOrdersByStatus.rejected](state, action) {
      state.orders.loading = false;
      state.orders.status = action.payload.status;
      state.orders.msg = action.payload.msg;
    },
    [getOrderById.pending](state, action) {
      state.order.loading = true;
      state.order.status = null;
      state.order.msg = "";
    },
    [getOrderById.fulfilled](state, action) {
      state.order.loading = false;
      state.order.status = action.payload.status;
      state.order.msg = action.payload.msg;
      state.order.data = action.payload.orderItems;
    },
    [getOrderById.rejected](state, action) {
      state.order.loading = false;
      state.order.status = action.payload.status;
      state.order.msg = action.payload.msg;
    },
    [updateOrderById.pending](state, action) {
      state.order.loading = true;
      state.order.status = null;
      state.order.msg = "";
    },
    [updateOrderById.fulfilled](state, action) {
      state.order.loading = false;
      state.order.status = action.payload.status;
      state.order.msg = action.payload.msg;
      const index = state.orders.data.findIndex(
        (ele) => ele._id === action.payload.orderId
      );
      state.orders.data = [
        ...state.orders.data.slice(0, index),
        ...state.orders.data.slice(index + 1),
      ];
    },
    [updateOrderById.rejected](state, action) {
      state.order.loading = false;
      state.order.status = action.payload.status;
      state.order.msg = action.payload.msg;
    },
  },
});

const { reducer } = orderSlice;
export default reducer;
