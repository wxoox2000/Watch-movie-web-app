import { createSlice } from "@reduxjs/toolkit";
import { fetchBySearch, fetchFavM, fetchFavS } from "./operations";

const initialState = {
  favMovies: [],
  favSeries: [],
  notLogged: false,
  results: [],
  totalPages: null,
  page: null,
};

const accSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addFavM(state, action) {
      state.favMovies.push(action.payload);
    },
    addFavS(state, action) {
      state.favSeries.push(action.payload);
    },
    removeFavM(state, action) {
      state.favMovies = state.favMovies.filter((id) => id !== action.payload);
    },
    removeFavS(state, action) {
      state.favSeries = state.favSeries.filter((id) => id !== action.payload);
    },
    notLogged(state) {
      state.notLogged = true;
    },
    notLoggedInit(state) {
      state.notLogged = false;
    },
    revertToInit(state) {
      state.favMovies = [];
      state.favSeries = [];
    },
    defaultResults(state) {
      state.results = [];
      state.totalPages = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavM.fulfilled, (state, action) => {
        state.favMovies = action.payload.map((data) => data.id);
      })
      .addCase(fetchFavS.fulfilled, (state, action) => {
        state.favSeries = action.payload.map((data) => data.id);
      })
      .addCase(fetchBySearch.fulfilled, (state, action) => {
        state.results.push(...action.payload.results);
        state.totalPages = action.payload.total_pages;
        state.page = action.payload.page;
      });
  },
});

export const {
  addFavM,
  addFavS,
  removeFavM,
  removeFavS,
  revertToInit,
  defaultResults,
  notLogged,
  notLoggedInit,
} = accSlice.actions;
export const accReducer = accSlice.reducer;
