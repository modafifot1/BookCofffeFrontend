import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profileApi } from "../../apis";
import { setInfo, setImageUrl } from "./authSlice";

const initialState = {
  profile: {
    data: {},
    loading: false,
    msg: "",
    status: null,
  },
};
export const getProfile = createAsyncThunk(
  "getProfile",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await profileApi.getProfile();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileApi.updateProfile(data);
      if (res.status < 300) dispatch(setInfo(res));
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "updateAvatar",
  async (avatar, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileApi.updateAvatar(avatar);
      if (res.status < 300) {
        console.log("Vo update");
        dispatch(setImageUrl(res));
      }
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const changePassword = createAsyncThunk(
  "changePassword",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      return await profileApi.changePassword(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    [getProfile.pending](state, action) {
      state.profile.loading = true;
      state.profile.msg = "";
      state.profile.status = null;
    },
    [getProfile.fulfilled](state, action) {
      state.profile.loading = false;
      state.profile.msg = action.payload.msg;
      state.profile.status = action.payload.status;
      state.profile.data = action.payload.profile;
    },
    [getProfile.rejected](state, action) {
      state.profile.loading = false;
      state.profile.msg = action.payload?.msg;
      state.profile.status = action.payload?.status;
    },
    [updateProfile.pending](state, action) {
      state.profile.loading = true;
      state.profile.msg = "";
      state.profile.status = null;
    },
    [updateProfile.fulfilled](state, action) {
      state.profile.loading = false;
      state.profile.msg = action.payload.msg;
      state.profile.status = action.payload.status;
      state.profile.data = action.payload.profile;
    },
    [updateProfile.rejected](state, action) {
      state.profile.loading = false;
      state.profile.msg = action.payload?.msg;
      state.profile.status = action.payload?.status;
    },
    [updateAvatar.pending](state, action) {
      state.profile.loading = true;
      state.profile.msg = "";
      state.profile.status = null;
    },
    [updateAvatar.fulfilled](state, action) {
      state.profile.loading = false;
      state.profile.msg = action.payload.msg;
      state.profile.status = action.payload.status;
      state.profile.data.imageUrl = action.payload.newAvatar;
    },
    [updateAvatar.rejected](state, action) {
      state.profile.loading = false;
      state.profile.msg = action.payload?.msg;
      state.profile.status = action.payload?.status;
    },
    [changePassword.pending](state, action) {
      state.profile.loading = true;
      state.profile.msg = "";
      state.profile.status = null;
    },
    [changePassword.fulfilled](state, action) {
      state.profile.loading = false;
      state.profile.msg = action.payload.msg;
      state.profile.status = action.payload.status;
    },
    [changePassword.rejected](state, action) {
      state.profile.loading = false;
      state.profile.msg = action.payload?.msg;
      state.profile.status = action.payload?.status;
    },
  },
});

const { reducer } = profileSlice;

export default reducer;
