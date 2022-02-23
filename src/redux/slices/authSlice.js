import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, axiosClient } from "../../apis/index";
import Cookies from "js-cookie";
const initialState = {
  error: null,
  user: {
    fullName: Cookies.get("fullName"),
    imageUrl: Cookies.get("imageUrl"),
    roleId: Cookies.get("roleId"),
  },
  loading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      console.log("Login Datasdsdsd: ", data);
      const res = await authApi.login(data);
      Cookies.set("token", res.token);
      Cookies.set("fullName", res.fullName);
      Cookies.set("imageUrl", res.imageUrl);
      Cookies.set("roleId", res.roleId);
      axiosClient.defaults.headers.authorization = `Bearer ${Cookies.get(
        "token"
      )}`;
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return authApi.logout();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setImageUrl(state, action) {
      state.user.imageUrl = action.payload.newAvatar;
      Cookies.set("imageUrl", action.payload.newAvatar);
    },
    setInfo(state, action) {
      console.log(action.payload);
      state.user.fullName = action.payload.profile.fullName;
      Cookies.set("fullName", action.payload.profile.fullName);
    },
  },
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
export const { setInfo, setImageUrl } = actions;
export default authReducer;
