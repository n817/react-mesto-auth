import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import '../index.css';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Footer from './Footer';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [regStatusError, setRegStatusError] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();


  // Если в локальном хранилище есть токен, то проверяем его валидность на сервере и авторизуем пользователя
  useEffect(() => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      auth.tokenCheck(currentToken)
      .then((res) => {
        setEmail(res.data.email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('token');
      });
    }
  }, [history]);

  function handleSignUp({ email, password }) {
    auth.signUp({ email, password })
      .then((res) => {
        if (res.data) {
          setRegStatusError(false);
          setIsInfoTooltipOpen(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setRegStatusError(err);
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }

  function handleSignIn({ email, password }) {
    auth.signIn({ email, password }) // user@test.com, 123456
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(email);
          localStorage.setItem('token', res.token);
          history.push('/');
        }
      })
      .catch((err) => {
        setRegStatusError(err);
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }

  function handleSignOut() {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
  }

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card){
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  // Загружаем данные пользователя с сервера
  useEffect(() => {
    api.getUserInfo()
    .then((res) => {
      setCurrentUser(res);
      })
    .catch((err) => {
       console.log(err);
      });

  }, []);

  // Загружаем карточки с сервера
  useEffect(() => {
    api.getCardList()
    .then((res) => {
      setCards(res);
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);


  function handleUpdateUser({name, about}) {
    api.setUserInfo({name, about})
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      })
    .catch((err) => {
       console.log(err);
      })
  }

  function handleUpdateAvatar(newAvatarUrl) {
    api.setUserAvatar(newAvatarUrl)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      })
    .catch((err) => {
       console.log(err);
      })
  }

  function handleAddPlaceSubmit({newCardName, newCardUrl}) {
    api.postNewCard({newCardName, newCardUrl})
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
      })
    .catch((err) => {
       console.log(err);
      })
  }

  // Обработка лайков
  function handleCardLike(card) {
	  // Проверяем, есть ли уже лайк на этой карточке
	  const isLiked = card.likes.some(i => i._id === currentUser._id);
	  // Отправляем запрос в API и получаем обновлённые данные карточки
	  api.changeLikeCardStatus({isLiked, cardId: card._id})
    .then((newCard) => {
		  // Формируем новый массив на основе имеющегося, подставляя в него новую карточку и обновляем стейт
	    setCards((cards) => cards.map((i) => i._id === card._id ? newCard : i));
	  })
    .catch((err) => {
      console.log(err);
     })
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(cards.filter((i) => i._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
     })
  }


  // Реализуем закрытие popup кнопкой Esc
  useEffect(() => {

    function handleEscClose(evt) {
      if (evt.key ==='Escape') {
        closeAllPopups();
      }
    }
    // Список действий внутри одного хука
    document.addEventListener('keyup', handleEscClose);

    // Возвращаем функцию, которая удаляет эффекты
    return () => {
      document.removeEventListener('keyup', handleEscClose);
    }

  },[]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          loggedIn={loggedIn}
          email={email}
          onSignOut={handleSignOut}
        />

        <Switch>
          <Route path="/sign-up">
            <Register 
              onRegister={handleSignUp}
            />
          </Route>

          <Route path="/sign-in">
            <Login 
              onLogin={handleSignIn}
            />
          </Route>

          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar = {handleEditAvatarClick}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            cards = {cards}
          />
        </Switch>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}/>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}/>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}/>

        <InfoTooltip 
          isOpen={isInfoTooltipOpen}
          regStatusError={regStatusError}
          onClose={closeAllPopups}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
