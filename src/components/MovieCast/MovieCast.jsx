import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchMovieCastById } from '../../services/fetchApi';
import s from './MovieCast.module.css';
import 'swiper/css';
import 'swiper/css/navigation';

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getCastById = async () => {
      try {
        const result = await fetchMovieCastById(movieId);
        setCast(result.cast);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCastById();
  }, [movieId]);

  if (!cast || cast.length === 0) {
    return <p className={s.noCast}>No cast information available.</p>;
  }

  return (
    <div className={s.castContainer}>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
          1440: { slidesPerView: 6 },
        }}
      >
        {cast.map(actor => (
          <SwiperSlide key={actor.cast_id || actor.id} className={s.slide}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              alt={actor.name || 'Unknown actor'}
              className={s.actorImage}
            />
            <h3 className={s.actorName}>{actor.name}</h3>
            <p className={s.characterName}>
              as {actor.character || 'Unknown role'}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCast;
