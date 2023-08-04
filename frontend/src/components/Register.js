import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegister }) {
  return (
    <div className="auth">
      <AuthForm
        title="Регистрация"
        buttonName="Зарегистрироваться"
        buttonLoadingName="Регистрация..."
        onSubmit={onRegister}
      />
      <Link className="auth__link common-link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
