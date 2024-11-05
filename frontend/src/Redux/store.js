// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Assuming your authSlice is already created
import productsReducer from './productSlice';  // Correct the import path for productsReducer
import cartReducer from './cartSlice'; // Assuming you have a cartSlice

const store = configureStore({
  reducer: {
    auth: authReducer,  // Manages authentication state
    product: productsReducer,  // Manages product state
    cart: cartReducer  // Manages cart state
  }
});

export default store;
