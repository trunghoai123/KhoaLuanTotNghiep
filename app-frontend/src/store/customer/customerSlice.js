import axiosClient from "utils/axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const getCustomerByPhone = createAsyncThunk(
  "customer/getCustomerByPhone",
  async (phoneNumber, thunkAPI) => {
    const response = await axiosClient.post(`order/addOrder`, phoneNumber);
    return response.data;
  }
);
const customerSlice = createSlice({
  name: "dish",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerByPhone.pending, (state, action) => {})
      .addCase(getCustomerByPhone.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getCustomerByPhone.rejected, (state, action) => {});
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = customerSlice;
// Extract and export each action creator by name
export const {} = actions;
// Export the reducer, either as a default or named export
export default reducer;
