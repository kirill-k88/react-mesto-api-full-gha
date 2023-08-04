import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  return (
    <li className="cards__card">
      {card.owner._id === currentUser._id && (
        <button
          className="cards__button-remove common-link"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img className="cards__photo" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="cards__caption">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-container">
          <button
            className={`cards__button-like common-link ${isLiked && 'cards__button-like_active'}`}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="cards__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
