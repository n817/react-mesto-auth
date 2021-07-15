import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (`card__trash-button ${isOwn ? 'card__trash-button_active' : ''}`);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`card__like-button ${isLiked ? 'card__like-button_active' : ''}`);;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }


  return (
    <div>
      <figure className="card">
        <button className="card__image-button" onClick={handleClick}>
          <img src={card.link} alt={card.name} className="card__image"/>
        </button>
        <figcaption className="card__caption">
          <p className="card__title">{card.name}</p>
          <div className="card__like-block">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится"></button>
            <p className="card__likes-counter">{card.likes.length}</p>
          </div>
        </figcaption>
        <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="Удалить"></button>
      </figure>
    </div>
  )
}

export default Card;
