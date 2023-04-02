import axiosClient from "utils/axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const addOrder = createAsyncThunk("order/addOrder", async (data, thunkAPI) => {
  const response = await axiosClient.post(`order/addOrder`, { ...data });
  return response.data;
});
// export const getAreaByAreaId = createAsyncThunk(
//   "area/getAreaByAreaId",
//   async (MaKhuVuc, thunkAPI) => {
//     const response = await axiosClient.post(`area/getAreaByAreaId`, { MaKhuVuc });
//     return response.data;
//   }
// );
// export const getAreaByAreaId = (MaKhuVuc) => {
//   return axiosClient.get(`area/getAreaByAreaId`, { MaKhuVuc }).then((res) => {
//     return res.data;
//   });
// };
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
