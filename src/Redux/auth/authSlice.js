import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser } from "./operations";

const initialState = {
  userName: null,
  userAvatar: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isError: false,
  isLoading: false,
  id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getId(state, action) {
      state.token = action.payload;
    },
    getData(state, action) {
      state.userName = action.payload.username;
      state.id = action.payload.id;
      state.userAvatar = action.payload.avatar.tmdb.avatar_path;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.userName = action.payload.username;
        state.id = action.payload.id;
        state.userAvatar = action.payload.avatar.tmdb.avatar_path;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.userName = null;
        state.userAvatar = null;
        state.token = null;
        state.isLoggedIn = false;
        state.id = '';
      });
  },
});

export const { getId, getData } = authSlice.actions;
export const authReducer = authSlice.reducer;
