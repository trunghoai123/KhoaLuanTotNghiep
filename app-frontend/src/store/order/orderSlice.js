import axiosClient from "utils/api";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const addOrder = createAsyncThunk("order/addOrder", async (data, thunkAPI) => {
  const response = await axiosClient.post(`order/addOrder`, { ...data });
  return response.data;
});
const orderSlice = createSlice({
  name: "dish",
  initialState: {
    dishList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state, action) => {})
      .addCase(addOrder.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {});
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = orderSlice;
// Extract and export each action creator by name
export const {} = actions;
// Export the reducer, either as a default or named export
export default reducer;
