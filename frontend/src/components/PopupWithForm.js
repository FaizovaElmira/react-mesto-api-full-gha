function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form
          className={`form form_type_${props.name}`}
          name={`formElement${props.name}`}
          onSubmit={props.onSubmit}
          action="/"
          method="POST"
          noValidate
        >
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button
            className={`form__button ${
              props.isDisabledSubmitButton && "form__button_disabled"
            }`}
            type="submit"
            disabled={props.isDisabledSubmitButton}
          >
            {props.buttonText || "Сохранить"}
          </button>
        </form>
        <button
          className="popup__button popup__button_type_close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
