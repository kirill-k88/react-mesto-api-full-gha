import successIcon from '../images/popup/success.png';
import failureIcon from '../images/popup/failure.png';

function InfoTooltip({ isOpen, isRegisterSuccess, onClose }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'} `}>
      <div className="popup__container popup__container_isTooltip">
        <button
          className="popup__button-close common-link"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__icon"
          src={isRegisterSuccess ? successIcon : failureIcon}
          alt={isRegisterSuccess ? 'успех' : 'неудача'}
        />
        <p className="popup__label">
          {isRegisterSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
