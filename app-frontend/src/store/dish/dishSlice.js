import axiosClient from "utils/api";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const getDishById = createAsyncThunk("dish/getDishById", async (dishId, thunkAPI) => {
  const response = await axiosClient.get(`menu/getOneMenu/${dishId}`, {});
  return response.data;
});
const dishSlice = createSlice({
  name: "dish",
  initialState: {
    dishList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDishById.pending, (state, action) => {})
      .addCase(getDishById.fulfilled, (state, action) => {})
      .addCase(getDishById.rejected, (state, action) => {});
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = dishSlice;
// Extract and export each action creator by name
export const {} = actions;
// Export the reducer, either as a default or named export
export default reducer;
