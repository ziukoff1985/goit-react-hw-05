import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviewById } from '../../services/fetchApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null); // Стан для відгуків
  const { movieId } = useParams(); // Отримуємо ID фільму з URL

  useEffect(() => {
    const getReviewsById = async () => {
      try {
        const result = await fetchMovieReviewById(movieId); // Запит на API
        setReviews(result.results); // Зберігаємо отримані відгуки
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getReviewsById();
  }, [movieId]);

  if (!reviews) {
    return <div>Loading...</div>; // Відображення під час завантаження
  }

  if (reviews.length === 0) {
    return <p className={s.noReviews}>No reviews available for this movie.</p>; // Повідомлення, якщо немає відгуків
  }

  return (
    <div className={s.reviewContainer}>
      <Swiper
        modules={[Pagination, Navigation]} // Модулі для Swiper
        pagination={{ clickable: true }} // Включення пагінації
        navigation={true} // Включення навігаційних кнопок
        spaceBetween={16} // Відстань між слайдами
        slidesPerView={1} // Кількість слайдів, що відображаються одночасно
      >
        {reviews.map(({ id, author, content }) => (
          <SwiperSlide key={id}>
            <div className={s.reviewSlide}>
              <h3 className={s.reviewAuthor}>Author: {author}</h3>
              <p className={s.reviewContent}>{content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieReviews;
