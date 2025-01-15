import { useEffect, useState } from 'react'; // хуки useState, useEffect
import { useParams } from 'react-router-dom'; // Хук - отримання параметрів з URL
import { Navigation } from 'swiper/modules'; // Модуль для навігації в Swiper (карусель акторів)
import { Swiper, SwiperSlide } from 'swiper/react'; // Компоненти для створення слайдера Swiper (бібліотека)
import { fetchMovieCastById } from '../../services/fetchApi'; // Функція для отримання інформації про акторів фільму за ID
import s from './MovieCast.module.css'; // CSS-стилі
import 'swiper/css'; // Загальні стилі Swiper
import 'swiper/css/navigation'; // Стилі для навігаційних кнопок Swiper

// Компонент 'MovieCast' => відображає інформацію про акторів фільму
const MovieCast = () => {
  const [cast, setCast] = useState([]); // Стан - збереження списку акторів
  const { movieId } = useParams(); // Отримуємо параметр 'movieId' із URL щоб ідентифікувати фільм, для якого потрібно завантажити список акторів.

  // Використовуємо useEffect для виконання асинхронного запиту на АРІ (отримання списку акторів) щоразу, при завантаженні або зміні movieId
  useEffect(() => {
    // Функція для отримання даних про акторів за ID фільму
    const getCastById = async () => {
      try {
        // Викликаємо функцію fetchMovieCastById з переданим movieId і зберігаємо результат
        const result = await fetchMovieCastById(movieId);
        // Оновлюємо стан cast (список акторів)
        setCast(result.cast);
      } catch (error) {
        console.error('Error:', error); // Логуємо помилки
      }
    };
    getCastById(); // Викликаємо функцію для отримання списку акторів
  }, [movieId]); // Виконуємо ефект при зміні movieId

  // Якщо списка акторів немає або він порожній - рендеримо повідомлення
  if (!cast || cast.length === 0) {
    return <p className={s.noCast}>No cast information available.</p>;
  }

  // Рендер компонента
  return (
    <div className={s.castContainer}>
      {/* Компонент Swiper для створення слайдера */}
      <Swiper
        modules={[Navigation]} // Додаємо модуль навігації
        navigation // Увімкнення кнопок "вперед" і "назад"
        spaceBetween={16} // Відстань між слайдами
        slidesPerView={4} // Кількість слайдів, що відображаються одночасно
        breakpoints={{
          // Налаштування адаптивного дизайну
          640: { slidesPerView: 2 }, // На ширині >= 640px - 2 слайда
          1024: { slidesPerView: 4 }, // На ширині >= 1024px - 4 слайда
          1440: { slidesPerView: 6 }, // На ширині >= 1440px - 6 слайда
        }}
      >
        {/* Ітеруємося по масиву cast і створюємо слайди */}
        {cast.map(actor => (
          // Кожен слайд має унікальний ключ (actor.cast_id або actor.id)
          <SwiperSlide key={actor.cast_id || actor.id} className={s.slide}>
            {/* Відображаємо зображення актора */}
            <img
              src={
                // Є фото - URL, немає - заглушка
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              alt={actor.name || 'Unknown actor'}
              className={s.actorImage}
            />
            {/* Ім'я актора */}
            <h3 className={s.actorName}>{actor.name}</h3>
            {/* Роль актора */}
            <p className={s.characterName}>
              {/* Якщо роль невідома, показуємо "Unknown role" */}
              as {actor.character || 'Unknown role'}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCast;
