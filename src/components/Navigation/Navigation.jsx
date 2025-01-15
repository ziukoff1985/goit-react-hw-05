import { FaFilm } from 'react-icons/fa'; // Іконка з бібліотеки `react-icons`
import s from './Navigation.module.css'; // CSS-стилі
import { clsx } from 'clsx'; // Бібліотека `clsx` для об'єднання класів CSS.
import { Link, NavLink } from 'react-router-dom'; // Компоненти `Link` і `NavLink` для маршрутизації

// Функція для визначення CSS-класів (isActive від NavLink).
// Додає `s.navActive`, якщо посилання активне, і базовий клас `s.navLink`.
const buildLinkClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.navActive);
};

// Основний компонент навігації застосунку (в хедері)
const Navigation = () => {
  return (
    // Обгортка
    <div className={s.navHeader}>
      {/* 
        Логотип застосунку. Використовує компонент `Link` для перенаправлення на головну сторінку ("/").
      */}
      <Link to="/" className={s.logo_link}>
        {/* Контейнер для логотипу */}
        <div className={s.logo}>
          <span>
            {/* Ліва іконка "Фільм". */}
            <FaFilm className={s.logoIcon} />
          </span>
          {/* Назва застосунку. */}
          <h2 className={s.logoTitle}>Filmoteka</h2>
          <span>
            {/* Права іконка "Фільм". */}
            <FaFilm className={s.logoIcon} />
          </span>
        </div>
      </Link>

      {/* Меню навігації. */}
      <nav className={s.navigation}>
        {/* Посилання на HomePage */}
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        {/* Посилання на MoviesPage */}
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
