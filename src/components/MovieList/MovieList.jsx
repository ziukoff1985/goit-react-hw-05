import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={s.filmList}>
      {movies.map((movie, index) => {
        return (
          <li key={`${movie.id}-${index}`} className={s.filmItem}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={s.link}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w400/${movie.poster_path}`
                    : 'placeholder.jpg'
                }
                alt={movie.title || 'No title available'}
                className={s.filmImage}
              />
              <h2 className={s.filmTitle}>{movie.title || 'Untitled'}</h2>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
