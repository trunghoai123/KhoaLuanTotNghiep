import axiosClient from "utils/axios";
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
export const addToCartById = createAsyncThunk("cart/getCartById", async (dishId, thunkAPI) => {
  const response = await axiosClient.get(`menu/getOneMenu/${dishId}`, {});
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("Restaurant-Cart")) || [],
  },
  reducers: {
    createCart(state, action) {
      return state;
    },
    addToCart(state, action) {
      return state;
    },
    updateCart(state, action) {},
    deleteCart(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartById.pending, (state, action) => {})
      .addCase(addToCartById.fulfilled, (state, action) => {
        if (action?.payload?.data) {
          const data = { ...action.payload.data };
          const jsonValues = localStorage.getItem("Restaurant-Cart");
          let parsedJson = JSON.parse(jsonValues);
          localStorage.removeItem("Restaurant-Cart");
          let newValues = [];
          if (Array.isArray(parsedJson) && parsedJson.length > 0) {
            // values = [{...}]
            newValues = [...parsedJson];
            const index = newValues.findIndex((item) => item._id === data._id);
            if (index !== -1) {
              newValues[index].SoLuong = newValues[index].SoLuong + 1;
            } else {
              newValues.push({ ...data, SoLuong: 1 });
            }
            localStorage.setItem("Restaurant-Cart", JSON.stringify(newValues));
          } else if (Array.isArray(parsedJson) && parsedJson.length === 0) {
            // values = []
            newValues.push({ ...data, SoLuong: 1 });
            localStorage.setItem("Restaurant-Cart", JSON.stringify(newValues));
          } else {
            // values = null
            newValues.push({ ...data, SoLuong: 1 });
            localStorage.setItem("Restaurant-Cart", JSON.stringify(newValues));
          }
          state.cartItems = newValues;
        }
      })
      .addCase(addToCartById.rejected, (state, action) => {
        console.log(action.payload);
        state.cartItems.push({ id: action.payload.id });
      });
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = cartSlice;
// Extract and export each action creator by name
export const { createCart, updateCart, deleteCart, addToCart } = actions;
// Export the reducer, either as a default or named export
export default reducer;
