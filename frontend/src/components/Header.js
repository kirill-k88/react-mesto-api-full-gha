import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header/header-logo.svg';

function Header({ email, loggedIn, onLogout }) {
  const location = useLocation();

  function getLink() {
    if (location.pathname === '/sign-in' && !loggedIn) {
      return (
        <Link className="header__link common-link" to="/sign-up">
          Регистрация
        </Link>
      );
    } else if (loggedIn) {
      return (
        <button className="header__link common-link" type="button" onClick={onLogout}>
          Выход
        </button>
      );
    }
    return (
      <Link className="header__link common-link" to="/sign-in">
        Войти
      </Link>
    );
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого" />
      <div className="header__loginContainer">
        {loggedIn && <p className="header__email">{email}</p>}
        {getLink()}
      </div>
    </header>
  );
}

export default Header;
