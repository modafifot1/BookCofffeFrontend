import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import controlReducer from "./slices/controlSlice";
import productReducer from "./slices/productSlice";
import employeeReducer from "./slices/employeeSlice";
import customerReducer from "./slices/customerSlice";
import orderReducer from "./slices/orderSlice";
import bookReducer from "./slices/bookSlice";
import borrowedBookReducer from "./slices/borrowedBookSlice";
const rootReducer = {
  auth: authReducer,
  control: controlReducer,
  product: productReducer,
  employee: employeeReducer,
  customer: customerReducer,
  order: orderReducer,
  book: bookReducer,
  borrowedBook: borrowedBookReducer,
};
export default configureStore({
  reducer: rootReducer,
});
