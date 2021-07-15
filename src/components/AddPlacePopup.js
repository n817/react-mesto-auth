import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [newCardName, setNewCardName] = React.useState('');
  const [newCardUrl, setNewCardUrl] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({newCardName, newCardUrl});
  }

  function handleCardNameAdd(e) {
    setNewCardName(e.target.value);
  }

  function handleCardUrlAdd(e) {
    setNewCardUrl(e.target.value);
  }

  return(
    <PopupWithForm
      name="card-add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="form__field">
        <input
          type="text"
          value={newCardName}
          onChange={handleCardNameAdd}
          id="title-input"
          className="form__input"
          name="cardname"
          placeholder="Название"
          minLength="1"
          maxLength="30"
          required
        />
      <span className="form__input-error title-input-error"></span>
      </label>
      <label className="form__field">
        <input
          type="url"
          value={newCardUrl}
          onChange={handleCardUrlAdd}
          id="url-input"
          className="form__input form__input-url"
          name="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__input-error url-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
