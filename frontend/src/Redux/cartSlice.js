import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],  // Array of cart items
  totalAmount: 0,  // Total price of the cart
  totalItems: 0,   // Total number of items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      
      if (existingItemIndex >= 0) {
        // If the item already exists in the cart, increase its quantity
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Otherwise, add a new item to the cart
        state.items.push(newItem);
      }

      // Recalculate the total amount and total items count
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      
      // Recalculate the total amount and total items count
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },

    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      
      if (existingItem) {
        existingItem.quantity = quantity;
      }

      // Recalculate the total amount and total items count
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
