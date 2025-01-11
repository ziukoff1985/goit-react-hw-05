import { FaFilm } from 'react-icons/fa';
import s from './Navigation.module.css';
import { clsx } from 'clsx';
import { Link, NavLink } from 'react-router-dom';

const buildLinkClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.navActive);
};

const Navigation = () => {
  return (
    <div className={s.navHeader}>
      <Link to="/" className={s.logo_link}>
        <div className={s.logo}>
          <span>
            <FaFilm className={s.logoIcon} />
          </span>
          <h2 className={s.logoTitle}>Filmoteka</h2>
          <span>
            <FaFilm className={s.logoIcon} />
          </span>
        </div>
      </Link>
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
