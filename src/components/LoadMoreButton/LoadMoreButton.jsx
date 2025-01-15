import s from './LoadMoreButton.module.css'; // CSS-стилі

// Компонент `LoadMoreButton` (кнопка)
// Приймає пропс `onClick`, який відповідає за функцію, що виконується при натисканні на кнопку.
// Використовується в компонентах 'MoviesPage' та 'HomePage'
const LoadMoreButton = ({ onClick }) => {
  return (
    // Обгортка
    <div className={s.buttonWrap}>
      {/* Кнопка з обробником події `onClick`, який викликає функцію, передану через пропс */}
      <button
        onClick={onClick} // Викликає функцію - пропс `onClick`
        className={s.button}
        aria-label="Load more items"
      >
        {/* Текст кнопки */}
        <span>Load More</span>
      </button>
    </div>
  );
};

export default LoadMoreButton;
