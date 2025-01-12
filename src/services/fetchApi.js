import axios from 'axios'; // Імпортуємо бібліотеку axios

// Встановлюємо базову URL-адресу для всіх запитів до API
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

// Зчитуємо ключ API із змінних середовища (файл .env).
const API_KEY = import.meta.env.VITE_API_KEY; // Файл додан в .gitignore

// ==================== Функції для роботи з API TMDB ==================== //

// Функція для отримання списку популярних фільмів
// Використовується на головній сторінці (HomePage.jsx).
export const fetchTrendingMovies = async page => {
  const response = await axios.get('trending/movie/day', {
    params: { api_key: API_KEY, page }, // page для LoadMore
    // Передаємо ключ API та номер сторінки як параметри запиту.
  });
  return response.data; // Повертаємо об'єкт із результатами запиту (відповідь API).
};

// Функція для отримання інформації про фільм за його ID
// Використовується в файлі MovieDetailsPage.jsx
export const fetchMovieById = async id => {
  const response = await axios.get(`movie/${id}`, {
    params: { api_key: API_KEY },
    // Передаємо ключ API як параметр для авторизації.
  });
  return response.data; // Повертаємо об'єкт із інформацію про фільм.
};

// Функція для пошуку фільмів за запитом користувача
// Використовується у файлі MoviesPage.jsx для реалізації пошуку фільмів.
export const fetchMovieByQuery = async (query, page = 1) => {
  const response = await axios.get('search/movie', {
    params: { api_key: API_KEY, query, page }, // page для LoadMore
    // Передаємо ключ API, текст запиту й номер сторінки як параметри.
  });
  return response.data; // Повертаємо об'єкт зі списком фільмів, що відповідають пошуковому запиту.
};

// Функція для отримання відгуків про фільм за його ID
// Використовується в файлі MovieReviews.jsx
export const fetchMovieReviewById = async id => {
  const response = await axios.get(`/movie/${id}/reviews`, {
    params: { api_key: API_KEY },
    // Передаємо ключ API як параметр авторизації.
  });
  return response.data; // Повертаємо об'єкт із відгуками про фільм.
};

// Функція для отримання списку акторів (касту) фільму за його ID
// Використовується в файлі MovieCast.jsx
export const fetchMovieCastById = async id => {
  const response = await axios.get(`/movie/${id}/credits`, {
    params: { api_key: API_KEY },
    // Передаємо ключ API як параметр авторизації.
  });

  return response.data; // Повертаємо об'єкт із інформацію про акторів
};
