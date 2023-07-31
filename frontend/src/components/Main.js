import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button
          className="profile__button profile__button_type_avatar"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            alt="Аватар"
            src={currentUser.avatar}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__button profile__button_type_edit"
            type="button"
            aria-label="Кнопка редактирования"
            onClick={onEditProfile}
          ></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__button profile__button_type_add"
          type="button"
          aria-label="Кнопка добавления карточки"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="photo" aria-label="Галерея фотографий">
        <ul className="photo__container">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
