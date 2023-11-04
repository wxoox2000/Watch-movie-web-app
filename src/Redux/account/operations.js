import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userSearch } from "../../Components/fetchAPI";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjJiNGNkNmNiNDhmNTY3Yjc2ZTdlN2JmZTY4M2U4ZSIsInN1YiI6IjY1MDViYWJmNDJkOGE1MDExYmQ2MWY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s82WzK6bT1muysDzxZRZIWFGde0nfQaRQ9ACaXwwjrE";
const APIKEY = "7b2b4cd6cb48f567b76e7e7bfe683e8e";

export const fetchFavM = createAsyncThunk(
  "account/getFavM",
  async (id, thunkAPI) => {
    try {
      const options = {
        key: APIKEY,
      };
      const res = await axios.get(
        `/account/${id}/favorite/movies?language=en-US&sort_by=created_at.asc`,
        options
      );
      return res.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchFavS = createAsyncThunk(
  "account/getFavS",
  async (id, thunkAPI) => {
    try {
      const options = {
        key: APIKEY,
      };
      const res = await axios.get(
        `/account/${id}/favorite/tv?language=en-US&sort_by=created_at.asc`,
        options
      );
      return res.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBySearch = createAsyncThunk(
  "account/search",
  async (obj, thunkAPI) => {
    console.log("fetch");
    try {
      const res = await userSearch(obj.query, obj.page);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
