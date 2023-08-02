import React from "react";
import successIcon from "../images/icon-success.svg";
import errorIcon from "../images/icon-error.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_infotooltip ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_tooltip">
        <img
          src={props.isSuccess ? successIcon : errorIcon}
          alt={props.isSuccess ? "Знак успеха" : "Знак ошибки"}
          className="popup__tooltip-icon"
        />
        <p className="popup__tooltip-text">
          {props.isSuccess ? "Вы успешно зарегистрировались!" :props.message || props.errorMessage || "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button className="popup__button popup__button_type_close" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
