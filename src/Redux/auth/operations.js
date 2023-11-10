import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotification } from "../../Components/notificationsApi";
import { currentTime } from "../../Components/NotificationBuilder";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjJiNGNkNmNiNDhmNTY3Yjc2ZTdlN2JmZTY4M2U4ZSIsInN1YiI6IjY1MDViYWJmNDJkOGE1MDExYmQ2MWY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s82WzK6bT1muysDzxZRZIWFGde0nfQaRQ9ACaXwwjrE";
const APIKEY = "7b2b4cd6cb48f567b76e7e7bfe683e8e";

export const logIn = createAsyncThunk("auth/login", async (obj, thunkAPI) => {
  try {
    const options = {
      key: APIKEY,
    };
    (async function () {
      const res = await axios.get("/authentication/token/new", options);
      return res.data;
    })()
      .then(async (data) => {
        const res = await axios.post(
          "/authentication/token/validate_with_login",
          { ...obj.values, request_token: data.request_token }
        );
        return res.data;
      })
      .then(async (data) => {
        const res = await axios.post("/authentication/session/new", {
          request_token: data.request_token,
        });
        obj.f(res.data.session_id);
        return res.data;
      })
      .then(async (data) => {
        const res = await axios.get(
          `/account/&session_id=${data.session_id}}`,
          options
        );
        obj.data(res.data);
        const date = new Date();
        addNotification({
          action: "login",
          content: {},
          createdAt: currentTime(),
          timeStamp: date.getTime(),
        });
      });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      const options = {
        key: APIKEY,
      };
      const res = await axios.get(
        `/account/&session_id=${persistedToken}`,
        options
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (sessionId, thunkAPI) => {
    try {
      const options = {
        key: APIKEY,
      };
      const res = await axios.delete(
        `authentication/session?session_id=${sessionId}`,
        options
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
