import axiosClient from "utils/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
// const fetchDishes = async () => {
//   try {
//     const result = await axiosClient.get("menu/getAllMenu", {});
//     if (result?.data?.data) {
//       setDishes(result.data.data);
//     }
//   } catch (error) {
//     console.log(error);
//     return;
//   }
// };
export const fetchCartById = createAsyncThunk("cart/getCartById", async (dishId, thunkAPI) => {
  const response = await axiosClient.get(`menu/getOneMenu/${dishId}`, {});
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    dishes: [],
  },
  reducers: {
    createCart(state, action) {
      console.log(action.payload);
      return state;
    },
    addToCart(state, action) {
      console.log(action.payload);
      return state;
    },
    updateCart(state, action) {},
    deleteCart(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartById.fulfilled, (state, action) => {
      console.log(action.payload);
      state.dishes.push({ id: action.payload.id });
    });
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = cartSlice;
// Extract and export each action creator by name
export const { createCart, updateCart, deleteCart, addToCart } = actions;
// Export the reducer, either as a default or named export
export default reducer;
