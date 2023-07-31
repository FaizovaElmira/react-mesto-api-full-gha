import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);

  const cardDeleteButtonClassName = `photo__trash ${
    isOwn ? "photo__trash_visible" : ""
  }`;
  const cardLikeButtonClassName = `photo__like ${
    isLiked ? "photo__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="photo__item">
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          type="button"
          aria-label="Кнопка удаления"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="photo__card"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="photo__info">
        <h2 className="photo__title">{card.name}</h2>
        <div className="photo__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Кнопка лайка"
            onClick={handleLikeClick}
          ></button>
          <span className="photo__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
