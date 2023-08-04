import { useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { apiAuth } from '../utils/Auth';
import { api } from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [confirmFunction, setConfirmFunction] = useState(() => {});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(card) {
    setConfirmFunction(() => setIsLoading => {
      handleCardDelete(card, setIsLoading);
    });
    setIsConfirmPopupOpen(true);
  }

  function handleSubmit(request, setIsLoading, handleError) {
    setIsLoading(true);
    request()
      .catch(err => {
        console.error(err);
        handleError && handleError();
      })
      .finally(() => setIsLoading(false));
  }

  function handleCardDelete(card, setIsLoading) {
    function makeRequest() {
      return api.deleteCard(card._id).then(({ message }) => {
        if (message === 'Пост удалён') {
          setCards(cards.filter(item => item._id !== card._id));
          closeAllPopups();
        }
      });
    }

    handleSubmit(makeRequest, setIsLoading);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    (!isLiked ? api.sendLike(card._id) : api.deleteLike(card._id))
      .then(newCard => {
        setCards(cards => cards.map(item => (item._id === card._id ? newCard : item)));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateUser(userObject, setIsLoading) {
    function makeRequest() {
      return api.modifyUserInfo(userObject).then(result => {
        setCurrentUser(result);
        closeAllPopups();
      });
    }

    handleSubmit(makeRequest, setIsLoading);
  }

  function handleUpdateAvatar(avatarObject, setIsLoading) {
    function makeRequest() {
      return api.modifyAvatar(avatarObject).then(result => {
        setCurrentUser(result);
        closeAllPopups();
      });
    }

    handleSubmit(makeRequest, setIsLoading);
  }

  function handleAddPlaceSubmit(cardObject, setInputValues, setIsLoading) {
    function makeRequest() {
      return api.sendNewCard(cardObject).then(result => {
        setCards([result, ...cards]);
        setInputValues({ name: '', link: '' });
        closeAllPopups();
      });
    }

    handleSubmit(makeRequest, setIsLoading);
  }

  function handleRegister({ password, email }, setIsLoading) {
    function makeRequest() {
      return apiAuth.register(password, email).then(() => {
        navigate('/sign-in');
        setIsRegisterSuccess(true);
        setIsInfoTooltipOpen(true);
      });
    }

    handleSubmit(makeRequest, setIsLoading, () => {
      setIsRegisterSuccess(false);
      setIsInfoTooltipOpen(true);
    });
  }

  function handleLogin({ password, email }, setIsLoading) {
    function makeRequest() {
      return apiAuth
        .authorize(password, email)
        .then(data => {
          setLoggedIn(true);
          localStorage.setItem('token', data.token);
          return apiAuth.checkToken();
        })
        .then(checkAnswer => {
          setEmail(checkAnswer.data.email);
          navigate('/');
        });
    }

    handleSubmit(makeRequest, setIsLoading, () => {
      localStorage.removeItem('token');
      setIsRegisterSuccess(false);
      setIsInfoTooltipOpen(true);
      setIsLoading(false);
    });
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    setEmail('');
    navigate('/sign-in');
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      apiAuth
        .checkToken()
        .then(checkAnswer => {
          setEmail(checkAnswer.data.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      navigate('/sign-in');
    }
  }, []);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(results => {
        setCurrentUser({
          name: results[0].name,
          about: results[0].about,
          avatar: results[0].avatar,
          _id: results[0]._id
        });
        return Promise.resolve(results[1]);
      })
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const isOpen =
    isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header email={email} loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  <Main
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDeleteClick={handleCardDeleteClick}
                  />
                }
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={confirmFunction}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isRegisterSuccess={isRegisterSuccess}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
