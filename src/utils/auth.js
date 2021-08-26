import { authSettings } from "./utils";

class Auth {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // Проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Регистрация
  signUp({ email, password }) {
    return fetch(`${this.baseUrl}/signup`,
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ password, email })
      }
    )
    .then(this._checkResponse);
  }

  // Авторизация
  signIn({ email, password }) {
    return fetch(
      `${this.baseUrl}/signin`, 
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({password, email})
      }
    )
    .then(this._checkResponse);
  }

  // Проверка токена
  tokenCheck(token) {
    return fetch(
      `${this.baseUrl}//users/me`, 
      {
        method: 'GET',
        headers: { 
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        }
      }
    )
    .then(this._checkResponse);
  }

}

const auth = new Auth(authSettings.baseUrl);
export default auth;