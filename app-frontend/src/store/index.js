import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "store/cart/cartSlice";
import bookingSlice from "store/booking/bookingSlice";
import dishSlice from "store/dish/dishSlice";
import orderSlice from "store/order/orderSlice";
import authSlice from "store/auth/authSlice";
import cusomterSlice from "store/customer/customerSlice";

const store = configureStore({
  reducer: combineReducers({
    cart: cartSlice,
    booking: bookingSlice,
    dish: dishSlice,
    order: orderSlice,
    auth: authSlice,
    cusomter: cusomterSlice,
  }),
});

export default store;
