import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common.Authorization =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjJiNGNkNmNiNDhmNTY3Yjc2ZTdlN2JmZTY4M2U4ZSIsInN1YiI6IjY1MDViYWJmNDJkOGE1MDExYmQ2MWY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s82WzK6bT1muysDzxZRZIWFGde0nfQaRQ9ACaXwwjrE';
const APIKEY = '7b2b4cd6cb48f567b76e7e7bfe683e8e';

export const login = createAsyncThunk('auth/login', async (creds, thunkAPI) => {
    const options = {
        key: APIKEY,
      };
    try {
        const resp = await axios.post("authentication/token/validate_with_login", options);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})