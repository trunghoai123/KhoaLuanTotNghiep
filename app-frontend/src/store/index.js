import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "store/cart/cartSlice";
import bookingSlice from "store/booking/bookingSlice";
import dishSlice from "store/dish/dishSlice";
import orderSlice from "store/order/orderSlice";

const store = configureStore({
  reducer: combineReducers({
    cart: cartSlice,
    booking: bookingSlice,
    dish: dishSlice,
    order: orderSlice,
  }),
});

export default store;
