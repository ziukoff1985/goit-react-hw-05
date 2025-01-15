import { Formik, Form, Field } from 'formik'; // Імпорт бібліотеки `Formik`
import s from './SearchForm.module.css'; // CSS-стилі

// Компонент `SearchForm`, що приймає два пропса (з 'MoviesPage'):
// - `onSubmit`: функція-обробник для події відправлення форми.
// - `initialQuery`: початкове значення для поля пошуку.
const SearchForm = ({ onSubmit, initialQuery }) => {
  return (
    // Компонент <Formik>
    // - `initialValues` — об'єкт із початковими значеннями поля форми (ключ `search`).
    // - `onSubmit` — функція, яка викликається при відправці форми.
    <Formik initialValues={{ search: initialQuery }} onSubmit={onSubmit}>
      {/* Компонент <Form */}
      <Form className={s.form}>
        {/* Компонент <Field> - поле вводу (input).
          - `name="search"` => ім'я поля, відповідає ключу  */}
        <Field
          type="text"
          name="search"
          placeholder="Enter movie title..."
          className={s.input}
        />
        {/* Кнопка для подання форми */}
        <button type="submit" className={s.button}>
          {/* SVG-іконка (лупа) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={s.icon}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.442 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
          </svg>
          <span>Search</span>
        </button>
      </Form>
    </Formik>
  );
};

export default SearchForm;
