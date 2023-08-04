import { useState } from 'react';
import { useForm } from '../hooks/useForm';

function AuthForm({ title, buttonName, buttonLoadingName, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    onSubmit(values, setIsLoading);
  }

  return (
    <form className={`auth__form`} name={`register-form`} onSubmit={handleSubmit}>
      <h2 className="auth__title">{title}</h2>
      <input
        className="auth__input"
        name="email"
        placeholder="Email"
        required
        type="email"
        value={values.email || ''}
        onChange={handleChange}
      />
      <input
        className="auth__input auth__input_content_password"
        name="password"
        type="password"
        placeholder="Пароль"
        required
        minLength="7"
        maxLength="30"
        value={values.password || ''}
        onChange={handleChange}
      />
      <button className="auth__button-submit common-link" type="submit">
        {!isLoading ? buttonName : buttonLoadingName}
      </button>
    </form>
  );
}

export default AuthForm;
