function PopupWithForm({
  name,
  title,
  buttonName,
  buttonLoadingName,
  isOpen,
  onClose,
  children,
  onSubmit,
  isLoading
}) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'} `}>
      <div className="popup__container">
        <button
          className="popup__button-close common-link"
          type="button"
          onClick={onClose}
        ></button>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__button-submit common-link" type="submit">
            {!isLoading ? buttonName : buttonLoadingName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
