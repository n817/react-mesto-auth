import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_type_zoom ${card.link ? "popup_opened" : ""}`} aria-label="Просмотр фотографий">
      <figure className="zoom">
        <button type="button" className="popup__close-button" aria-label="Закрыть попап" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="zoom__image"/>
        <figcaption className="zoom__caption">{card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
