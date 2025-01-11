import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/fetchApi';
import MovieList from '../../components/MovieList/MovieList';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import Error from '../../components/Error/Error';
import { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const { results, total_pages } = await fetchTrendingMovies(page);
        console.log(results);

        setMovies(prevMovies => [...prevMovies, ...results]);
        setTotalPages(total_pages);
      } catch (error) {
        setIsError(true);
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getTrendingMovies();
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader />}
      <MovieList movies={movies} />
      {isError && <Error />}
      {page < totalPages && <LoadMoreButton onClick={handleLoadMore} />}
    </div>
  );
};

export default HomePage;
