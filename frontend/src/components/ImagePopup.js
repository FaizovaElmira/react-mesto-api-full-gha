import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_view ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_photo">
        <button
          className="popup__button popup__button_type_close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img className="popup__photo" src={props.card.link} alt={props.card.name} />
        <h2 className="popup__caption">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
