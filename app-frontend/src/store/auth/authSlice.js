import axiosClient from "utils/axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (accountInfor, thunkAPI) => {
    const response = await axiosClient.post(`account/signUp`, accountInfor);
    return response.data;
  }
);
export const signIn = createAsyncThunk("account/signIn", async (accountInfor, thunkAPI) => {
  const response = await axiosClient.post(`account/signIn`, accountInfor);
  return response.data;
});
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfor: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    return builder
      .addCase(createAccount.pending, (state, action) => {})
      .addCase(createAccount.fulfilled, (state, action) => {})
      .addCase(createAccount.rejected, (state, action) => {})
      .addCase(signIn.pending, (state, action) => {})
      .addCase(signIn.fulfilled, (state, action) => {})
      .addCase(signIn.rejected, (state, action) => {});
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const {} = actions;
// Export the reducer, either as a default or named export
export default reducer;
