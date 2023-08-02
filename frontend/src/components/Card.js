import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardDeleteButtonClassName = `photo__trash ${
    isOwn ? "photo__trash_visible" : ""
  }`;
  const cardLikeButtonClassName = `photo__like ${
    isLiked ? "photo__like_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  // Add console.log statements to check the values
  console.log("currentUser._id:", currentUser._id);
  console.log("props.card.owner:", props.card.owner);

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
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="photo__info">
        <h2 className="photo__title">{props.card.name}</h2>
        <div className="photo__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Кнопка лайка"
            onClick={handleLikeClick}
          ></button>
          <span className="photo__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;


