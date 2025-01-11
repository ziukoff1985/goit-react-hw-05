import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieByQuery } from '../../services/fetchApi';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import NoResultsNotification from '../../components/NoResultsNotification/NoResultsNotification';
import { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setIsNotFound(false);
      setIsLoading(true);
      try {
        const { results, total_pages } = await fetchMovieByQuery(query, page);

        if (results.length === 0) {
          setIsNotFound(true);
        }

        setMovies(prevMovies =>
          page === 1 ? results : [...prevMovies, ...results]
        );
        setTotalPages(total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  const handleSearchSubmit = (values, actions) => {
    if (values.search.trim() === '') {
      return;
    }

    setSearchParams({ query: values.search });
    actions.resetForm();
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className={s.moviesPage}>
      <Toaster position="top-center" reverseOrder={false} />
      {isNotFound && <NoResultsNotification />}
      <SearchForm onSubmit={handleSearchSubmit} initialQuery={query} />
      {isLoading && <Loader />}

      {movies.length > 0 && <MovieList movies={movies} />}
      {page < totalPages && <LoadMoreButton onClick={handleLoadMore} />}
    </div>
  );
};

export default MoviesPage;
