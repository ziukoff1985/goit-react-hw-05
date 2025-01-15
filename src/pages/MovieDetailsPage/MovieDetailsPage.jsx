import { useEffect, useState } from 'react'; // хуки React
import { Link, useLocation, useParams } from 'react-router-dom'; // Імпорт для роботи з маршрутизацією: посилання, поточна локація та параметри URL.
import { fetchMovieById } from '../../services/fetchApi'; // Функція для отримання деталей фільму за його ідентифікатором.
import { NavLink, Outlet } from 'react-router-dom'; // Імпорт для створення навігаційних посилань і вкладених маршрутів.
import { FaRegCalendarAlt, FaStar, FaTags } from 'react-icons/fa'; // Імпорт іконок
import s from './MovieDetailsPage.module.css'; // CSS-стилі
import clsx from 'clsx'; // Бібліотека для керування класами CSS.
import { useRef } from 'react'; // Xук useRef для створення посилань, що зберігають значення між рендерами.
import { IoIosArrowBack } from 'react-icons/io'; // Імпорт іконки для кнопки "назад".

// Функція для визначення CSS-класів (isActive від NavLink).
const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active); // Використання clsx для додавання класу 'active', якщо посилання активне.
};

// Сторінка деталей фільму
const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null); // Стан для деталей фільму.
  const { movieId } = useParams(); // Отримання параметра 'movieId' з URL.
  const location = useLocation(); // Отримання поточної локації для зберігання інформації про маршрут.
  const goBackLink = useRef(location.state ?? '/movies'); // Використання useRef для збереження посилання "Go Back" (за замовчуванням '/movies').

  // Використовуємо useEffect для виконання запиту на АРІ (отримання деталей фільму) щоразу, після завантаження компонента або зміни movieId)
  useEffect(() => {
    const getMovieById = async () => {
      try {
        const result = await fetchMovieById(movieId); // Виклик API для отримання даних фільму за ID.
        setMovie(result); // Оновлення стану movie отриманими даними.
      } catch (error) {
        console.error('Error:', error); // Лог помилки
      }
    };
    getMovieById(); // Викликаємо функцію для отримання деталей фільму
  }, [movieId]); // Виконується при зміні movieId.

  if (!movie) {
    // Відображення повідомлення "Loading...", поки дані фільму завантажуються (якщо movie = 'false')
    return <div>Loading...</div>;
  }

  return (
    <div className={s.wrapper}>
      {/* Кнопка для повернення на попередню сторінку */}
      <Link to={goBackLink.current} className={s.back}>
        <IoIosArrowBack className={s.icon_back} />
        Go back
      </Link>
      <div className={s.img_info_wrap}>
        {/* Зображення фільму */}
        <img
          className={s.image}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w400/${movie.poster_path}` // URL постера фільму.
              : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' // Заглушка, якщо постера немає.
          }
          alt={movie.title}
        />
        <div className={s.infoWrap}>
          {/* Заголовок фільму */}
          <h2 className={s.title}>{movie.title}</h2>
          {/* Дата релізу */}
          <p className={s.paragpaph}>
            <FaRegCalendarAlt className={s.icon} />
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          {/* Рейтинг */}
          <p className={s.paragpaph}>
            <FaStar className={s.icon} />
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          {/* Жанри */}
          <p className={s.paragpaph}>
            <FaTags className={s.icon} />
            <strong>Genres:</strong>
            {/* Форматування списку жанрів у рядок через кому */}
            {movie.genres.map(genre => genre.name).join(', ')}
          </p>
          {/* Опис */}
          <p className={`${s.paragpaph} ${s.overview}`}>
            <strong>Overview:</strong> {movie.overview}
          </p>
          {/* Навігація для вкладених маршрутів */}
          <nav className={s.nav}>
            {/* Посилання на акторський склад */}
            <NavLink to={`/movies/${movieId}/cast`} className={buildLinkClass}>
              Cast
            </NavLink>
            {/* Посилання на відгуки */}
            <NavLink
              to={`/movies/${movieId}/reviews`}
              className={buildLinkClass}
            >
              Reviews
            </NavLink>
          </nav>
        </div>
      </div>
      {/* Відображення вкладених маршрутів */}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
