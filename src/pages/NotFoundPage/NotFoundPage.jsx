import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <div className={s.gif}>
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className={s.content}>
        <h1 className={s.mainHeading}>This page is gone.</h1>
        <p>
          ...maybe the page you are looking for is not found or never existed.
        </p>
        <button>Back to home</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
