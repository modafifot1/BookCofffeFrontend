import { ContactSupportRounded } from "@material-ui/icons";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customerApi } from "../../apis/customerApi";

export const getCustomers = createAsyncThunk(
  "get/customers",
  async (queryString, { rejectWithValue, dispatch }) => {
    try {
      return await customerApi.getCustomers(queryString);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCustomer = createAsyncThunk(
  "get/customer",
  async (customerId, { rejectWithValue, dispatch }) => {
    try {
      return await customerApi.getCustomerById(customerId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateCustomer = createAsyncThunk(
  "update/customer",
  async (customerId, { rejectWithValue, dispatch }) => {
    try {
      return await customerApi.updateCustomerStatus(customerId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  customers: {
    data: [],
    status: null,
    msg: "",
    loading: false,
  },
  customer: {
    data: {},
    status: null,
    msg: "",
    loading: false,
  },
  customerId: "",
  isOpen: false,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomerId(state, action) {
      state.customerId = action.payload.customerId;
      state.isOpen = action.payload.isOpen;
    },
  },
  extraReducers: {
    [getCustomers.pending](state, action) {
      state.customers.loading = true;
      state.customers.msg = "";
      state.customers.status = null;
    },
    [getCustomers.fulfilled](state, action) {
      state.customers.data = action.payload.customers;
      state.customers.loading = false;
      state.customers.status = action.payload.status;
      state.customers.msg = action.payload.msg;
    },
    [getCustomers.rejected](state, action) {
      state.customers.loading = false;
      state.customers.status = action.payload?.status;
      state.customers.msg = action.payload?.msg;
    },
    [getCustomer.pending](state, action) {
      state.customer.loading = true;
      state.customer.msg = "";
      state.customer.status = null;
    },
    [getCustomer.fulfilled](state, action) {
      state.customer.data = action.payload.customer;
      state.customer.loading = false;
      state.customer.status = action.payload.status;
      state.customer.msg = action.payload.msg;
    },
    [getCustomer.rejected](state, action) {
      state.customer.loading = false;
      state.customer.status = action.payload?.status;
      state.customer.msg = action.payload?.msg;
    },
    [updateCustomer.pending](state, action) {
      state.customer.loading = true;
      state.customer.status = null;
      state.customer.msg = "";
    },
    [updateCustomer.fulfilled](state, action) {
      state.customer.loading = false;
      state.customer.status = action.payload.status;
      state.customer.msg = action.payload.msg;
      const foodIndex = state.customers.data.findIndex(
        (ele) => ele._id === action.payload.customerId
      );
      const newCustomer = state.customers.data[foodIndex];
      newCustomer.isBlocked = !newCustomer.isBlocked;
      state.customers.data[foodIndex] = newCustomer;
    },
    [updateCustomer.rejected](state, action) {
      state.customer.loading = false;
      state.customer.status = action.payload?.status;
      state.customer.msg = action.payload?.msg;
    },
  },
});

const { reducer, actions } = customerSlice;
export const { setCustomerId } = actions;
export default reducer;
