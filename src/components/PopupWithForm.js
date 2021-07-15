import React from 'react';

function PopupWithForm({name, title, buttonText, children, isOpen, onClose, onSubmit}) {
  const checkOpen = isOpen ? "popup_opened" : "";

  return (
    <section className={`popup popup_type_${name} ${checkOpen}`}>
      <form className="form" name={name} onSubmit={onSubmit} noValidate>
        <button type="button" className="popup__close-button" aria-label="Закрыть попап" onClick={onClose}></button>
        <h2 className="form__title">{title}</h2>
        {children}
        <button type="submit" className="form__submit-button">{buttonText}</button>
      </form>
    </section>
  )
}

export default PopupWithForm;

