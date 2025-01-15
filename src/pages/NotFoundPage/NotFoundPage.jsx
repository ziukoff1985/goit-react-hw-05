import { Link } from 'react-router-dom'; // Компонент `Link` для навігації
import s from './NotFoundPage.module.css'; // CSS-стилі

// Сторінка 404
const NotFoundPage = () => {
  return (
    // Головний контейнер
    <div className={s.container}>
      {/* Блок для анімованого GIF-изображення */}
      <div className={s.gif}>
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      {/* Блок для текстового контенту сторінки. */}
      <div className={s.content}>
        {/* Головний заголовок сторінки з повідомленням про помилку. */}
        <h2 className={s.mainHeading}>This page is gone.</h2>
        {/* Описове повідомлення для користувача, яке пояснює ситуацію. */}
        <p className={s.message}>
          ...maybe the page you are looking for is not found or never existed.
        </p>
        {/* Кнопка для повернення на головну сторінку. */}
        <Link to="/" className={s.back_link}>
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
