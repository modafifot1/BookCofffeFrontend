import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import controlReducer from "./slices/controlSlice";
import productReducer from "./slices/productSlice";
const rootReducer = {
  auth: authReducer,
  control: controlReducer,
  product: productReducer,
};
export default configureStore({
  reducer: rootReducer,
});
