import { apiSettings } from "./utils";

class Api {
  constructor({cardsUrl, userUrl, headers}) {
    this._cardsUrl = cardsUrl;
    this._userUrl = userUrl;
    this._headers = headers;
    this._authorization = headers.authorization;
  }

  // Проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение информации о пользователе с сервера
  getUserInfo() {
    return fetch(this._userUrl, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  // Загрузка новой информации о пользователе на сервер
  setUserInfo({name, about}) {
    return fetch(this._userUrl, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      about: about
      })
    })
    .then(this._checkResponse)
  }

  // Загрузка аватара пользователя на сервер
  setUserAvatar(newAvatarUrl) {
    return fetch(`${this._userUrl}/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: newAvatarUrl,
      })
    })
    .then(this._checkResponse)
  }

  // Получение массива карточек с сервера
  getCardList() {
    return fetch(this._cardsUrl, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  // Загрузка новой карточки на сервер
  postNewCard({newCardName, newCardUrl}) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCardName,
        link: newCardUrl
        })
    })
    .then(this._checkResponse)
  }

  // Лайк и удаление лайка карточки
  changeLikeCardStatus({isLiked, cardId}) {
    return fetch(`${this._cardsUrl}/likes/${cardId}`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  // Удаление карточки на сервере
  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

}


// Создаем экземпляр класса взаимодействия с API сервера
const api = new Api(apiSettings);


export default api;
