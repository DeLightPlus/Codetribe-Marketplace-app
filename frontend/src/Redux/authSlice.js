import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,  // Set the user to null by default
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload; // Store user data in the state
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Set error message
    },
    logout: (state) => {
      state.user = null; // Clear user data on logout
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
