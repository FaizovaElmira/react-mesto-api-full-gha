import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [props.isOpen, currentUser, resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser(values);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.buttonText}
      onSubmit={handleSubmit}
      isDisabledSubmitButton={!isValid}
    >
      <input
        className={`form__input ${
          errors.name ? " form__input_type_error" : ""
        }`}
        type="text"
        name="name"
        id="name"
        placeholder="Имя"
        value={values.name || ""}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="40"
      />
      <span
        className={`form__error ${errors.name ? "form__error_visible" : ""}`}
      >
        {errors.name}
      </span>
      <input
        className={`form__input ${
          errors.about ? " form__input_type_error" : ""
        }`}
        type="text"
        name="about"
        id="about"
        placeholder="О себе"
        value={values.about || ""}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="200"
      />
      <span
        className={`form__error ${errors.about ? "form__error_visible" : ""}`}
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
