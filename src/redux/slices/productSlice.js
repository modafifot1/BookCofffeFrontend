import { StarTwoTone } from "@material-ui/icons";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productApi } from "../../apis";
const initialState = {
  loadingPage: true,
  loading: false,
  error: null,
  products: [],
  product: {
    name: "",
    unitPrice: 0,
    discountOff: 0,
    discountMaximum: 0,
    description: "",
  },
  totalPage: 1,
  status: null,
  isNewConfirm: false,
};

export const getProducts = createAsyncThunk(
  "/getProducts",
  async (query, { rejectWithValue, dispatch }) => {
    try {
      return await productApi.getProducts(query);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "/createProduct",
  async (product, { rejectWithValue, dispatch }) => {
    try {
      return await productApi.createNewProduct(product);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "/updateProduct",
  async (product, { rejectWithValue, dispatch }) => {
    try {
      return await productApi.updateProduct(product);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/deleteProduct",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      return await productApi.deleteProduct(productId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmFood = createAsyncThunk(
  "/confirmFood",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      return await productApi.confirmFood(productId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct(state, action) {
      state.product = state.products.find((ele) => ele._id === action.payload);
    },
    onProductContentChange(state, action) {
      state.product = {
        ...state.product,
        [action.payload[0]]: action.payload[1],
      };
      console.log("State: ", state.product);
    },
    resetProductState(state, action) {
      console.log("ssdsd");
      state.product = {
        name: "",
        unitPrice: 0,
        discountOff: 0,
        discountMaximum: 0,
        description: "",
      };
    },
  },
  extraReducers: {
    [getProducts.pending](state, action) {
      state.loadingPage = true;
      state.error = null;
      state.isNewConfirm = false;
      state.status = null;
    },
    [getProducts.rejected](state, action) {
      state.loadingPage = false;
      state.error = action.payload;
      state.isNewConfirm = false;
      state.status = null;
    },
    [getProducts.fulfilled](state, action) {
      state.error = null;
      state.loadingPage = false;
      state.products = action.payload.foods;
      state.status = {
        status: action.payload.status,
        msg: action.payload.msg,
      };
      state.isNewConfirm = false;
      state.totalPage = action.payload.totalPage;
    },
    [createProduct.pending](state, action) {
      state.status = null;
      state.loading = true;
      state.error = null;
    },
    [createProduct.rejected](state, action) {
      state.status = null;
      state.loading = false;
      state.error = action.payload;
    },
    [createProduct.fulfilled](state, action) {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
      state.status = {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    },
    [updateProduct.pending](state, action) {
      state.loading = true;
      state.status = null;
      state.error = null;
    },
    [updateProduct.rejected](state, action) {
      state.loading = false;
      state.error = action.payload;
      state.status = null;
    },
    [updateProduct.fulfilled](state, action) {
      state.loading = false;
      state.status = {
        msg: action.payload.msg,
        status: action.payload.status,
      };
      state.error = null;
      const newProduct = action.payload.food;
      const foodIndex = state.products.findIndex(
        (ele) => ele._id === newProduct._id
      );
      state.products[foodIndex] = newProduct;
      console.log("newProduct: ", action.payload.food);
    },
    [deleteProduct.pending](state, action) {
      state.loading = true;
      state.error = null;
      state.status = null;
    },
    [deleteProduct.rejected](state, action) {
      state.loading = false;
      state.error = action.payload;
      state.status = null;
    },
    [deleteProduct.fulfilled](state, action) {
      state.loading = false;
      state.error = null;
      state.status = {
        msg: action.payload.msg,
        status: action.payload.status,
      };
      state.products = state.products.filter(
        (ele) => ele._id !== action.payload.deleteFoodId
      );
    },
    [confirmFood.pending](state, action) {
      state.error = null;
      state.loading = true;
    },
    [confirmFood.rejected](state, action) {
      state.loading = false;
      state.error = action.payload;
      state.status = null;
    },
    [confirmFood.fulfilled](state, action) {
      state.loading = false;
      state.error = null;
      state.status = {
        msg: action.payload.msg,
        status: action.payload.status,
      };
      state.isNewConfirm = true;
    },
  },
});
const { reducer: productReducer, actions } = productSlice;
export const { getProduct, onProductContentChange, resetProductState } =
  actions;
export default productReducer;
