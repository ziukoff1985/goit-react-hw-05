import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchMovieById } from '../../services/fetchApi';
import { NavLink, Outlet } from 'react-router-dom';
import { FaRegCalendarAlt, FaStar, FaTags } from 'react-icons/fa';
import s from './MovieDetailsPage.module.css';
import clsx from 'clsx';
import { useRef } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const goBackLink = useRef(location.state ?? '/movies');

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const result = await fetchMovieById(movieId); // Завантажуємо фільм за ID
        setMovie(result); // Оновлюємо стан з отриманими даними
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getMovieById(); // Викликаємо функцію запиту
  }, [movieId]); // Завдяки залежності useEffect викликається тільки при зміні movieId

  if (!movie) {
    return <div>Loading...</div>; // Виводимо Loading поки не завантажено
  }

  return (
    <div className={s.wrapper}>
      <Link to={goBackLink.current} className={s.back}>
        <IoIosArrowBack className={s.icon_back} />
        Go back
      </Link>
      <div className={s.img_info_wrap}>
        <img
          className={s.image}
          src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={s.infoWrap}>
          <h2 className={s.title}>{movie.title}</h2>
          <p className={s.paragpaph}>
            <FaRegCalendarAlt className={s.icon} />
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className={s.paragpaph}>
            <FaStar className={s.icon} />
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          <p className={s.paragpaph}>
            <FaTags className={s.icon} />
            <strong>Genres:</strong>{' '}
            {movie.genres.map(genre => genre.name).join(', ')}
          </p>
          <p className={`${s.paragpaph} ${s.overview}`}>
            <strong>Overview:</strong> {movie.overview}
          </p>
          <nav className={s.nav}>
            <NavLink to={`/movies/${movieId}/cast`} className={buildLinkClass}>
              Cast
            </NavLink>
            <NavLink
              to={`/movies/${movieId}/reviews`}
              className={buildLinkClass}
            >
              Reviews
            </NavLink>
          </nav>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
