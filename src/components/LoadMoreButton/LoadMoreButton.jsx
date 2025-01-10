import s from './LoadMoreButton.module.css';

const LoadMoreButton = ({ onClick }) => {
  return (
    // Контейнер для кнопки
    <div className={s.buttonWrap}>
      {/* Кнопка, яка викликає функцію onClick при кліку */}
      <button
        onClick={onClick}
        className={s.button}
        aria-label="Load more items"
      >
        <span>Load More</span>
      </button>
    </div>
  );
};

export default LoadMoreButton;
