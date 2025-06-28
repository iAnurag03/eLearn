import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
}; 

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
    },
    userLoggedOut:(state) => {
        state.user = null;
        state.isAuthenticated = false;
    },
    clearUserData: (state) => {
        state.user = null;
        state.isAuthenticated = false;
    }
  },
});

export const {userLoggedIn, userLoggedOut, clearUserData} = authSlice.actions;
export default authSlice.reducer;