import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import controlReducer from "./slices/controlSlice";
import productReducer from "./slices/productSlice";
import employeeReducer from "./slices/employeeSlice";
import customerReducer from "./slices/customerSlice";
const rootReducer = {
  auth: authReducer,
  control: controlReducer,
  product: productReducer,
  employee: employeeReducer,
  customer: customerReducer,
};
export default configureStore({
  reducer: rootReducer,
});
