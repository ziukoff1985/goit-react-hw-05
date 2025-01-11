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
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default SearchForm;
