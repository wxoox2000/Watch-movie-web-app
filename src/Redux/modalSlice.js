import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: true,
  modalData: {
    openMovie: false,
    openSeries: false,
    id: "",
    closing: false,
  },
};

const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // login modal
    openModal(state) {
      state.modalOpen = false;
    },
    closeModal(state) {
      state.modalOpen = true;
    },
    // movies/series modals
    openMovieModal(state, action) {
      state.modalData.openMovie = true;
      state.modalData.id = action.payload;
    },
    openSeriesModal(state, action) {
      state.modalData.openSeries = true;
      state.modalData.id = action.payload;
    },
    closingModal(state) {
      state.modalData.closing = true;
    },
    modalDataToInit(state) {
      state.modalData.openMovie = false;
      state.modalData.openSeries = false;
      state.modalData.id = "";
      state.modalData.closing = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  openMovieModal,
  openSeriesModal,
  closingModal,
  modalDataToInit,
} = slice.actions;
export const modalReducer = slice.reducer;
