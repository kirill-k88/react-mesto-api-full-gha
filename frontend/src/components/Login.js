import AuthForm from './AuthForm';

function Login({ onLogin }) {
  return (
    <div className="auth">
      <AuthForm title="Вход" buttonName="Войти" buttonLoadingName="Вход..." onSubmit={onLogin} />
    </div>
  );
}

export default Login;
