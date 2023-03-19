import axiosClient from "utils/api";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const addToCartById = createAsyncThunk("cart/getCartById", async (dishId, thunkAPI) => {
  const response = await axiosClient.get(`menu/getOneMenu/${dishId}`, {});
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartById.pending, (state, action) => {})
      .addCase(addToCartById.fulfilled, (state, action) => {})
      .addCase(addToCartById.rejected, (state, action) => {});
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = cartSlice;
// Extract and export each action creator by name
export const {} = actions;
// Export the reducer, either as a default or named export
export default reducer;
