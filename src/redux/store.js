import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import controlReducer from "./slices/controlSlice";

const rootReducer = {
  auth: authReducer,
  control: controlReducer,
};
export default configureStore({
  reducer: rootReducer,
});
