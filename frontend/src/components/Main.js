import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button
          className="profile__button profile__button_type_avatar"
          onClick={props.onEditAvatar}
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
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__button profile__button_type_add"
          type="button"
          aria-label="Кнопка добавления карточки"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="photo" aria-label="Галерея фотографий">
        <ul className="photo__container">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
