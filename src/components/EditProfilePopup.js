import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);


  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm
    name="profile-edit"
    title="Редактировать профиль"
    buttonText="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          type="text"
          value={name || ''}
          onChange={handleNameChange}
          className="form__input"
          placeholder="Имя"
          required
        />
        <span className="form__input-error username-input-error"></span>
      </label>
      <label className="form__field">
        <input
          type="text"
          value={description || ''}
          onChange={handleDescriptionChange}
          className="form__input"
          placeholder="О себе"
          required
        />
        <span className="form__input-error description-input-error"></span>
      </label>
  </PopupWithForm>
  );
}

export default EditProfilePopup;
