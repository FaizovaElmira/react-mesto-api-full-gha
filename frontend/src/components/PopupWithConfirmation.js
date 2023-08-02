import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.onConfirmation();
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default PopupWithConfirmation;
