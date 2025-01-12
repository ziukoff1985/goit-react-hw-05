import { Route, Routes } from 'react-router-dom'; // Компоненти  бібліотеки 'react-router-dom' для маршрутизації
import { Suspense, lazy } from 'react'; // React-модулі для використання відкладеного завантаження (lazy loading) і компонент Suspense
import './App.css'; // CSS-стилі
import Navigation from './components/Navigation/Navigation'; // Компонент навігації, який відображає меню навігації на всіх сторінках:
import Loader from './components/Loader/Loader'; // Компонент Loader

// Використовуємо функцію lazy для динамічного імпорту сторінок (відкладене завантаження):
const HomePage = lazy(() => import('./pages/HomePage/HomePage')); // Головна сторінка

const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage')); // Сторінка пошуку фільмів

const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
); // Сторінка з деталями фільму

const MovieCast = lazy(() => import('./components/MovieCast/MovieCast')); // Компонент з інформацією про акторів

const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
); // Компонент з відгуками

const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage')); // Сторінка 404 (не знайдено)

// Функція-компонент App, яка відповідає за головний макет і маршрутизацію програми:
function App() {
  return (
    <div>
      {/* Компонент навігації доступний на всіх сторінках */}
      <Navigation />
      {/* Використовуємо компонент Suspense для обробки відкладеного завантаження.
          Вказуємо компонент Loader, який буде відображатися, поки завантажуються інші компоненти. */}
      <Suspense fallback={<Loader />}>
        {/* Компонент Routes визначає всі маршрути програми */}
        <Routes>
          {/* Маршрут для головної сторінки */}
          <Route path="/" element={<HomePage />} />
          {/* Маршрут для сторінки пошуку фільмів */}
          <Route path="/movies" element={<MoviesPage />} />
          {/* Маршрут для сторінки деталей фільму, містить вкладені маршрути */}
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            {/* Вкладений маршрут для списку акторів */}
            <Route path="cast" element={<MovieCast />} />
            {/* Вкладений маршрут для відгуків */}
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          {/* Маршрут для обробки всіх інших шляхів (не знайдено) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
