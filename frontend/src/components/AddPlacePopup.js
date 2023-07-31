import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onClose, onAddCard, buttonText }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    onAddCard({
      name: values.title,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      isDisabledSubmitButton={!isValid}
    >
      <input
        className={`form__input ${errors.title && "form__input_type_error"}`}
        type="text"
        name="title"
        id="title"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={values.title || ""}
        onChange={handleChange}
      />
      <span className={`form__error ${errors.title && "form__error_visible"}`}>
        {errors.title}
      </span>
      <input
        className="form__input form__input_type_link"
        type="url"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className={`form__error ${errors.link && "form__error_visible"}`}>
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

