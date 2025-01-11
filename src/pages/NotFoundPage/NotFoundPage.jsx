import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <div className={s.gif}>
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className={s.content}>
        <h1 className={s.mainHeading}>This page is gone.</h1>
        <p className={s.message}>
          ...maybe the page you are looking for is not found or never existed.
        </p>
        <Link to="/" className={s.back_link}>
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
