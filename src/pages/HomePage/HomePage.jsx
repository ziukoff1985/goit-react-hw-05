import { useEffect, useState } from 'react'; // хуки React
import { fetchTrendingMovies } from '../../services/fetchApi'; // Функція для отримання популярних фільмів із API.
import MovieList from '../../components/MovieList/MovieList'; // Компонент для відображення списку фільмів.
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton'; // Кнопка Load More
import Error from '../../components/Error/Error'; // Компонент для відображення повідомлення про помилку.
import { Toaster } from 'react-hot-toast'; // Бібліотека для відображення повідомлень (toast).
import Loader from '../../components/Loader/Loader'; // Компонент Loader

// Головна сторінка
// Відображається при першому запуску додатку
const HomePage = () => {
  // Ініціалізація станів:
  const [movies, setMovies] = useState([]); // Стан для збереження списку фільмів
  const [page, setPage] = useState(1); // Стан для номеру поточної сторінки
  const [totalPages, setTotalPages] = useState(0); // Загальна кількість сторінок
  const [isError, setIsError] = useState(false); // Стан для помилки
  const [isLoading, setIsLoading] = useState(false); // Стан для Loader

  // Використовуємо useEffect для виконання запиту при першому завантаженні додатка і зміні номера сторінки (page).
  useEffect(() => {
    const getTrendingMovies = async () => {
      setIsError(false); // Скидаємо стан помилки перед запитом
      setIsLoading(true); // Активуємо стан завантаження (Loader)

      try {
        // Виконуємо запит до API для отримання популярних фільмів
        // Деструктур. об'єкт відповіді API response.data (з fetchData)
        const { results, total_pages } = await fetchTrendingMovies(page);
        // Додаємо нові результати до існуючого списку фільмів (стан movies)
        setMovies(prevMovies => [...prevMovies, ...results]);
        setTotalPages(total_pages); // Зберігаємо загальну кількість сторінок
      } catch (error) {
        // При помилці змінюємо стан на 'true' і виводимо помилку в консоль
        setIsError(true);
        console.error('Error:', error);
      } finally {
        setIsLoading(false); // Незалежно від результату вимикаємо Loader
      }
    };
    getTrendingMovies(); // Викликаємо функцію для отримання фільмів.
  }, [page]); // Виконуємо ефект щоразу, коли змінюється значення `page`.

  // Функція-обробник для кнопки "Load More"
  const handleLoadMore = () => {
    if (page < totalPages) {
      // Збільшуємо номер сторінки, якщо поточна сторінка менша за загальну кількість.
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div>
      {/* Компонент для показу повідомлень (toast). */}
      <Toaster position="top-center" reverseOrder={false} />
      {/* Показуємо Loader, якщо стан `isLoading` 'true' */}
      {isLoading && <Loader />}
      {/* Передаємо список фільмів (пропс) у компонент MovieList для рендеру */}
      <MovieList movies={movies} />
      {/* Показуємо компонент Error, якщо стан `isError` 'true' */}
      {isError && <Error />}
      {/* Якщо є наступні сторінки, показуємо кнопку "Load More" */}
      {page < totalPages && <LoadMoreButton onClick={handleLoadMore} />}
    </div>
  );
};

export default HomePage;
