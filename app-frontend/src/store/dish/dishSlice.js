import axiosClient from "utils/axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const getDishById = createAsyncThunk("dish/getDishById", async (dishId, thunkAPI) => {
  const response = await axiosClient.get(`menu/getOneMenu/${dishId}`, {});
  return response.data;
});
// export const getLinkFromImageFile = createAsyncThunk(
//   "image/getLinkFromImageFile",
//   async ({ image, id }, thunkAPI) => {
//     console.log(image, id);
//     const response = await axiosClient.post(`/image/sendImageAndGetLink`, { image, id });
//     return response.data;
//   }
// );
export const getLinkFromImageFile = createAsyncThunk(
  "image/getLinkFromImageFile",
  async ({ image, id }, thunkAPI) => {
    console.log(image, id);
    const response = await axiosClient.post(`/image/sendImageAndGetLink`, {
      body: image,
      headers: { "content-type": image.type, "content-length": `${image.size}` },
    });
    // async ({ image}, thunkAPI) => {
    //   console.log(image);
    //   const response = await axiosClient.post(`/image/sendImageAndGetLink`, { image });
    return response.data;
  }
);
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
      .addCase(getDishById.rejected, (state, action) => {})
      .addCase(getLinkFromImageFile.pending, (state, action) => {})
      .addCase(getLinkFromImageFile.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getLinkFromImageFile.rejected, (state, action) => {});
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = dishSlice;
// Extract and export each action creator by name
export const {} = actions;
// Export the reducer, either as a default or named export
export default reducer;
