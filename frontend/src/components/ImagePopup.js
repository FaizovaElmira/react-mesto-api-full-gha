import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_view ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_photo">
        <button
          className="popup__button popup__button_type_close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__photo" src={card.link} alt={card.name} />
        <h2 className="popup__caption">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
