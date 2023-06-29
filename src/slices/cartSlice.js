import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    total: localStorage.getItem("total")
      ? JSON.parse(localStorage.getItem("total"))
      : 0,
    totalItems: localStorage.getItem("totalItems")
      ? JSON.parse(localStorage.getItem("totalItems"))
      : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex((item)=> item._id===course._id)
            if(index>=0) {

            }
        }
    }
})
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;