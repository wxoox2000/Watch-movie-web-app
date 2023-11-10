import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjJiNGNkNmNiNDhmNTY3Yjc2ZTdlN2JmZTY4M2U4ZSIsInN1YiI6IjY1MDViYWJmNDJkOGE1MDExYmQ2MWY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s82WzK6bT1muysDzxZRZIWFGde0nfQaRQ9ACaXwwjrE";
const APIKEY = "7b2b4cd6cb48f567b76e7e7bfe683e8e";
export const fetchTrendingMovies = async (page=1) => {
  const options = {
    key: APIKEY,
  };
  const resp = await axios.get(`/movie/popular?language=en-US&page=${page}`, options);
  return resp.data;
};

export const fetchUpcomingMovies = async (page=1) => {
  const options = {
    key: APIKEY,
  };
  const resp = await axios.get(
  `movie/upcoming?language=en-US&page=${page}`,
    options
  );
  return resp.data;
};

export const fetchTopFilms = async (page=1) => {
  const options = {
    key: APIKEY,
  };
  const resp = await axios.get(
    `movie/top_rated?language=en-US&page=${page}`,
    options
  );
  return resp.data;
};

export const fetchTopSeries = async (page=1) => {
  const options = {
    key: APIKEY,
  };
  const resp = await axios.get(`tv/top_rated?language=en-US&page=${page}`, options);
  return resp.data;
};

export const fetchById = async (id) => {
  const options = {
    key: APIKEY,
  };
  const resp = await axios.get(`movie/${id}?language=en-US`, options);
  return resp.data;
};

export const fetchSeriesById = async (id) => {
  const options = {
    key: APIKEY,
  };
  const resp = await axios.get(`tv/${id}?language=en-US`, options);
  return resp.data;
};

export const fetchDocs = async (page=1) => {
  const options = {
    key: APIKEY,
  };
  const resp = await axios.get(
    `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_average.desc&with_genres=99`,
    options
  );
  return resp.data;
};

export const fetchProviders = async (id) => {
  const options = {
    key: APIKEY,
  };
  const resp = await axios.get(`movie/${id}/watch/providers`, options);
  return resp.data;
};

export const fetchProvidersSeries = async (id) => {
  const options = {
    key: APIKEY,
  };
  const resp = await axios.get(`tv/${id}/watch/providers`, options);
  return resp.data;
};

export const markFavourite = async ({M_Id, mark, type, s_Id, accId}) => {
  const options = {
    key: APIKEY,
    media_type:  `${type}`,
    media_id: M_Id,
    favorite: mark,
  };
  const resp = await axios.post(
    `/account/${accId}/favorite?session_id=${s_Id}`,
    options
  );
  return resp.data;
};

export const userSearch = async (query, page=1) => {
  const options = {
    key: APIKEY,
  };
  const resp = await axios.get(`/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`, options)
  return resp.data;
}
