import React from "react";
import successIcon from "../images/icon-success.svg";
import errorIcon from "../images/icon-error.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, errorMessage, message }) {
  return (
    <div className={`popup popup_type_infotooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_tooltip">
        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Знак успеха" : "Знак ошибки"}
          className="popup__tooltip-icon"
        />
        <p className="popup__tooltip-text">
          {isSuccess ? "Вы успешно зарегистрировались!" : message || errorMessage || "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button className="popup__button popup__button_type_close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
