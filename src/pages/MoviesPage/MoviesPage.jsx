import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieByQuery } from '../../services/fetchApi';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import NoResultsNotification from '../../components/NoResultsNotification/NoResultsNotification';
import { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setIsNotFound(false);
      setIsLoading(true);
      try {
        const fetchedMovies = await fetchMovieByQuery(query);

        if (fetchedMovies.results.length === 0) {
          setIsNotFound(true);
        }

        setMovies(fetchedMovies.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearchSubmit = (values, actions) => {
    if (values.search.trim() === '') {
      return;
    }

    setSearchParams({ query: values.search });
    actions.resetForm();
  };

  return (
    <div className={s.moviesPage}>
      <Toaster position="top-center" reverseOrder={false} />
      {isNotFound && <NoResultsNotification />}
      <SearchForm onSubmit={handleSearchSubmit} initialQuery={query} />
      {isLoading && <Loader />}

      {movies.length > 0 && <MovieList movies={movies} />}

      {query && movies.length === 0 && (
        <p className={s.noResults}>No movies found for {query}.</p>
      )}
    </div>
  );
};

export default MoviesPage;
