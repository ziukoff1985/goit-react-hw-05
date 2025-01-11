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
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const getReviewsById = async () => {
      try {
        const result = await fetchMovieReviewById(movieId); 
        setReviews(result.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getReviewsById();
  }, [movieId]);

  if (!reviews) {
    return <div>Loading...</div>;
  }

  if (reviews.length === 0) {
    return <p className={s.noReviews}>No reviews available for this movie.</p>;
  }

  return (
    <div className={s.reviewContainer}>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={true}
        spaceBetween={16}
        slidesPerView={1} 
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
