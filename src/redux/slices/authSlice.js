import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, axiosClient } from "../../apis/index";
import Cookies from "js-cookie";
const initialState = {
  error: null,
  user: null,
  loading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      console.log("Login Datasdsdsd: ", data);
      const res = await authApi.login(data);
      Cookies.set("token", res.token);
      axiosClient.defaults.headers.authorization = `Bearer ${Cookies.get(
        "token"
      )}`;
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending](state) {
      state.loading = true;
      state.error = null;
    },
    [login.rejected](state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    [login.fulfilled](state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
  },
});

const { reducer: authReducer, actions } = authSlice;
export default authReducer;
