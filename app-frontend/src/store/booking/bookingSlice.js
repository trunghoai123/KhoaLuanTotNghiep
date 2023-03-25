import axiosClient from "utils/axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
// export const addToCartById = createAsyncThunk("booking/addToCartById", async (dishId, thunkAPI) => {
//   const response = await axiosClient.get(`menu/getOneMenu/${dishId}`, {});
//   return response.data;
// });
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    cartItems: [],
  },
  reducers: {},
  extraReducers: (builder) => {},
});
// Extract the action creators object and the reducer
const { actions, reducer } = bookingSlice;
// Extract and export each action creator by name
export const {} = actions;
// Export the reducer, either as a default or named export
export default reducer;
