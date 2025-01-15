import { DNA } from 'react-loader-spinner'; // Бібліотека для Loader
import styles from './Loader.module.css'; // CSS-стилі

// Компонент `Loader`
const Loader = () => {
  return (
    // Обгортка для `Loader`
    <div className={styles.loaderWrap}>
      {/* 
        Компонент `DNA` з бібліотеки `react-loader-spinner` відображає анімований спінер у вигляді ДНК. 
        Основні властивості: 
        - `visible`: визначає, чи буде спінер видимим. У цьому випадку завжди `true`.
        - `height` та `width`: задають розміри спінера (200px).
        - `ariaLabel`: атрибут для доступності, який описує тип завантаження.
        - `wrapperStyle`: об'єкт для додаткового інлайн-стилю (зараз порожній).
        - `wrapperClass`: CSS-клас для стилізації обгортки.
      */}
      <DNA
        visible={true} // Спінер завжди відображається.
        height="200" // Висота спінера 200px.
        width="200" // Ширина спінера 200px.
        ariaLabel="dna-loading" // Опис для доступності.
        wrapperStyle={{}} // Порожній об'єкт для інлайн-стилів.
        wrapperClass="dna-wrapper" // Клас для стилізації обгортки.
      />
    </div>
  );
};

export default Loader;
