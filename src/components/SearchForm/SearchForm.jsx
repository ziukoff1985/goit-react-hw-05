import { Formik, Form, Field } from 'formik';
import s from './SearchForm.module.css';

const SearchForm = ({ onSubmit, initialQuery }) => {
  return (
    <Formik initialValues={{ search: initialQuery }} onSubmit={onSubmit}>
      <Form className={s.form}>
        <Field
          type="text"
          name="search"
          placeholder="Enter movie title..."
          className={s.input}
        />
        <button type="submit" className={s.button}>
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
