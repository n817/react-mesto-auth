import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const inputRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  return(
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
      <input
        type="url"
        ref={inputRef}
        id="avatar-input"
        className="form__input form__input-url"
        name="url"
        placeholder="Ссылка на картинку с аватаром"
        required
        />
       <span className="form__input-error avatar-input-error"></span>
      </label>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;
