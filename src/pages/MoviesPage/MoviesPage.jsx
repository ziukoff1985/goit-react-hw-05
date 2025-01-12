import { useSearchParams } from 'react-router-dom'; // useSearchParams - хук для роботи з параметрами URL
import { useState, useEffect } from 'react'; // хуки useState, useEffect
import { fetchMovieByQuery } from '../../services/fetchApi'; // Функція для отримання результатів пошуку фільмів з API
import s from './MoviesPage.module.css'; // CSS-стилі
import MovieList from '../../components/MovieList/MovieList'; // Компонент для відображення списку фільмів.
import SearchForm from '../../components/SearchForm/SearchForm'; // Компонент форми для пошуку фільмів
import NoResultsNotification from '../../components/NoResultsNotification/NoResultsNotification'; // Повідомлення про відсутність результатів
import { Toaster } from 'react-hot-toast'; // Бібліотека для відображення toast-повідомлень
import Loader from '../../components/Loader/Loader'; // Компонент Loader
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton'; // Кнопка Load More

// Сторінка для пошуку фільмів
const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // хук useSearchParams для доступу та зміни параметрів пошукового запиту в URL
  const query = searchParams.get('query') || ''; // Отримуємо параметр 'query' з URL: його значення (якщо користувач ввів в пошук) або пустий рядок, якщо параметр 'query' відсутній

  // Ініціалізація станів:
  const [movies, setMovies] = useState([]); // Стан для збереження списку фільмів по запиту 'query'
  const [isNotFound, setIsNotFound] = useState(false); // Стан для повідомлення про відсутність результатів
  const [isLoading, setIsLoading] = useState(false); // Стан для Loader
  const [page, setPage] = useState(1); // Стан для номеру поточної сторінки
  const [totalPages, setTotalPages] = useState(0); // Стан для загальної кількості сторінок з результатами

  // Використовуємо useEffect для виконання запиту на АРІ (отримання фільмів по пошуковому запиту) щоразу, коли змінюється query або page
  useEffect(() => {
    if (!query) return; // Якщо параметр 'query' порожній () - не робимо запит до API

    // Функція для відправки запиту на АРІ (отримання фільмів за запитом)
    const fetchMovies = async () => {
      setIsNotFound(false); // Скидаємо стан про відсутність результатів
      setIsLoading(true); // Активуємо стан завантаження (Loader)
      try {
        // Запит до API для отримання фільмів за пошуковим запитом та сторінкою
        // Деструктур. об'єкт відповіді API response.data (з fetchData)
        const { results, total_pages } = await fetchMovieByQuery(query, page);

        // Якщо результатів немає (відповідь від АРІ 'порожій масив'), встановлюємо стан про відсутність результатів
        if (results.length === 0) {
          setIsNotFound(true);
        }

        // Оновлюємо список фільмів:
        // Якщо поточна сторінка - перша, просто записуємо нові фільми,
        // якщо не перша - додаємо нові фільми до існуючого списку
        setMovies(prevMovies =>
          page === 1 ? results : [...prevMovies, ...results]
        );
        // Оновлюємо загальну кількість сторінок
        setTotalPages(total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error); // Логуємо помилки
      } finally {
        setIsLoading(false); // Незалежно від результату вимикаємо Loader
      }
    };
    fetchMovies(); // Викликаємо функцію для отримання фільмів
  }, [query, page]); // useEffect залежить від query та page, тобто спрацьовує при зміні цих значень

  // Функція для обробки 'сабміту' форми пошуку (пропс в SearchForm.jsx)
  // 'values', 'actions' - параметри приходять від Formik
  // 'search' - ім'я поля вводу
  const handleSearchSubmit = (values, actions) => {
    if (values.search.trim() === '') {
      return; // Якщо пошуковий запит порожній, не відправляємо запит
    }

    // Оновлюємо параметри URL, встановлюємо параметр 'query' з введеним значенням
    setSearchParams({ query: values.search });
    actions.resetForm(); // Очищаємо форму після відправки
  };

  // Функція-обробник для кнопки "Load More"
  const handleLoadMore = () => {
    if (page < totalPages) {
      // Якщо є наступні сторінки, збільшуємо номер поточної сторінки на 1
      setPage(prevPage => prevPage + 1);
    }
  };

  // Повертаємо JSX для рендерингу сторінки
  return (
    <div className={s.moviesPage}>
      {/* Ініціалізація бібліотеки toast для повідомлень */}
      <Toaster position="top-center" reverseOrder={false} />
      {/* Якщо не знайдено результатів, показуємо повідомлення */}
      {isNotFound && <NoResultsNotification />}
      {/* Компонент форми для пошуку */}
      <SearchForm onSubmit={handleSearchSubmit} initialQuery={query} />
      {/* Показуємо Loader, якщо стан `isLoading` 'true' */}
      {isLoading && <Loader />}
      {/* Якщо є фільми, відображаємо їх список */}
      {movies.length > 0 && <MovieList movies={movies} />}
      {/* Якщо є наступні сторінки, показуємо кнопку "Load More" */}
      {page < totalPages && <LoadMoreButton onClick={handleLoadMore} />}
    </div>
  );
};

export default MoviesPage;
