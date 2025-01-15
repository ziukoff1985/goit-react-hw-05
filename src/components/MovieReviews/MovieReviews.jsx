import { useEffect, useState } from 'react'; // хуки useState, useEffect
import { useParams } from 'react-router-dom'; // Хук - отримання параметрів з URL
import { fetchMovieReviewById } from '../../services/fetchApi'; // Функція для отримання відгуків на фільм за ID
import { Swiper, SwiperSlide } from 'swiper/react'; // Компоненти для створення слайдера Swiper (бібліотека)
import 'swiper/css'; // Основні стилі Swiper
import 'swiper/css/pagination'; // Стилі для пагінації (точки навігації)
import 'swiper/css/navigation'; // Стилі для кнопок "вперед/назад"
import { Pagination, Navigation } from 'swiper/modules'; // Модулі пагінації та навігації Swiper
import s from './MovieReviews.module.css'; // CSS-стилі

// Компонент 'MovieReviews' => відображає відгуки на фільм
const MovieReviews = () => {
  const [reviews, setReviews] = useState(null); // Стан - збереження відгуків
  const { movieId } = useParams(); // Отримуємо параметр 'movieId' із URL щоб ідентифікувати фільм, для якого потрібно завантажити відгуки.

  // Використовуємо useEffect для виконання асинхронного запиту на АРІ (отримання списку акторів) щоразу, при завантаженні або зміні movieId
  useEffect(() => {
    // Асинхронна функція для отримання відгуків за ID фільму
    const getReviewsById = async () => {
      try {
        // Викликаємо функцію fetchMovieReviewById з переданим 'movieId' і зберігаємо результат
        const result = await fetchMovieReviewById(movieId);
        // Оновлюємо стан reviews (відгуки)
        setReviews(result.results);
      } catch (error) {
        console.error('Error:', error); // Логуємо помилки
      }
    };
    getReviewsById(); // Викликаємо функцію для отримання відгуків
  }, [movieId]); // Виконуємо ефект при зміні movieId

  // Якщо стан reviews ще не завантажено, показуємо "Loading..."
  if (!reviews) {
    return <div>Loading...</div>;
  }

  // Якщо відгуків немає (довжина масиву 0), показуємо відповідне повідомлення
  if (reviews.length === 0) {
    return <p className={s.noReviews}>No reviews available for this movie.</p>;
  }

  // Рендер компонента
  return (
    <div className={s.reviewContainer}>
      {/* Компонент Swiper для створення слайдера */}
      <Swiper
        modules={[Pagination, Navigation]} // Додаємо модулі пагінації та навігації
        pagination={{ clickable: true }} // Увімкнення пагінації (точки для перемикання між слайдами)
        navigation={true} // Увімкнення кнопок "вперед/назад"
        spaceBetween={16} // Відстань між слайдами
        slidesPerView={1} // Одночасно відображається лише один слайд
      >
        {/* Ітеруємося по масиву reviews і створюємо слайди */}
        {reviews.map(({ id, author, content }) => (
          // 'key' - ключ для кожного слайда */}
          <SwiperSlide key={id}>
            <div className={s.reviewSlide}>
              {/* Відображаємо автора рецензії */}
              <h3 className={s.reviewAuthor}>Author: {author}</h3>
              {/* Відображаємо текст рецензії */}
              <p className={s.reviewContent}>{content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieReviews;
