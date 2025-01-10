import { FaFilm } from 'react-icons/fa';
import s from './Navigation.module.css';
import { clsx } from 'clsx';
import { NavLink } from 'react-router-dom';

const buildLinkClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.navActive);
};

const Navigation = () => {
  return (
    <div className={s.navHeader}>
      <div className={s.logo}>
        <span>
          <FaFilm className={s.logoIcon} />
        </span>
        <h2 className={s.logoTitle}>Filmoteka</h2>
        <span>
          <FaFilm className={s.logoIcon} />
        </span>
      </div>
      <nav className={s.navigation}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
