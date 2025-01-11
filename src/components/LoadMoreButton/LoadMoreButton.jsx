import s from './LoadMoreButton.module.css';

const LoadMoreButton = ({ onClick }) => {
  return (
    <div className={s.buttonWrap}>
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
