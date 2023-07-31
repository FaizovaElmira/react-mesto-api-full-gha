import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({
  isOpen,
  onClose,
  onConfirmation,
  buttonText,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onConfirmation();
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default PopupWithConfirmation;
