function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card._id && 'popup_opened'}`}>
      <div className="popup__container popup__container_isImage">
        <button
          className="popup__button-close common-link"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
