import { Link, useLocation } from 'react-router-dom'; // Імпорт для роботи з маршрутизацією: посилання, поточна локація.
import s from './MovieList.module.css'; // CSS-стилі

// Компонент `MovieList` відповідає за відображення списку фільмів.
// Приймає проп 'movies' - масив об'єктів з фільмами
const MovieList = ({ movies }) => {
  // Xук `useLocation` для отримання об'єкта поточного місця розташування.
  // Дозволяє передати поточний маршрут у стані до сторінки MovieDetailsPage
  // Поточний об'єкт location зберігає дані про поточний маршрут.
  // Цей об'єкт передається до MovieDetailsPage через атрибут 'state'
  const location = useLocation();

  // Рендер списку фільмів
  return (
    // Створюється список фільмів
    <ul className={s.filmList}>
      {movies.map((movie, index) => {
        // Ітерація по масиву `movies`, створення елементів списку для кожного фільму.
        return (
          // Унікальний ключ ('key') - `id` фільму + індекс.
          <li key={`${movie.id}-${index}`} className={s.filmItem}>
            {/*Створюється посилання на сторінку деталей фільму*/}
            {/*Шлях включає ідентифікатор фільму (`/movies/${movie.id}`)*/}
            {/*Атрибут `state` - об'єкт `location` для збереження поточного стану.*/}
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={s.link}
            >
              {/* Зображення фільму */}
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w400/${movie.poster_path}` // URL постера фільму.
                    : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' // Заглушка
                }
                alt={movie.title || 'No title available'}
                className={s.filmImage}
              />
              {/* Назви фільму. Якщо назва відсутня - "Untitled". */}
              <h2 className={s.filmTitle}>{movie.title || 'Untitled'}</h2>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
