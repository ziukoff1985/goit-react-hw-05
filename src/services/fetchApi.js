import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const API_KEY = import.meta.env.VITE_API_KEY;

// Функція для отримання фільмів
export const fetchTrendingMovies = async page => {
  const response = await axios.get('trending/movie/day', {
    params: { api_key: API_KEY, page },
  });

  console.log(response);

  return response.data;
};

// Функція для отримання фільму за ID
export const fetchMovieById = async id => {
  const response = await axios.get(`movie/${id}`, {
    params: { api_key: API_KEY },
  });
  console.log(response);
  return response.data;
};

// Функція для пошуку фільму по запиту
export const fetchMovieByQuery = async (query, page = 1) => {
  const response = await axios.get('search/movie', {
    params: { api_key: API_KEY, query, page },
  });
  console.log(response);
  return response.data;
};

// Функція для відгуків по фільму
export const fetchMovieReviewById = async id => {
  const response = await axios.get(`/movie/${id}/reviews`, {
    params: { api_key: API_KEY },
  });
  console.log(response);
  return response.data;
};

export const fetchMovieCastById = async id => {
  const response = await axios.get(`/movie/${id}/credits`, {
    params: { api_key: API_KEY },
  });
  console.log(response);
  return response.data;
};
