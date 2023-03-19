import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "store/cart/cartSlice";

const store = configureStore({
  reducer: combineReducers({
    cart: cartSlice,
  }),
});

export default store;
