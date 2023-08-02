import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithConfirmation from "./PopupWithConfirmation";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import api from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPopupWithConfirmationOpen, setPopupWithConfirmationOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isToolTipPopupOpen, setToolTipPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/");
            setEmail(res.data.email);
            api.setAuthorizationToken(token); // Устанавливаем токен авторизации
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  useEffect(() => {
    isLoggedIn &&
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([user, cards]) => {
          const { avatar, name, about, _id } = user.data; 
          setCurrentUser({ avatar, name, about, _id });
          setCards(cards.reverse());          
        })
        .catch((err) => {
          console.log(err);
        });
  }, [isLoggedIn]);

  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    function handleOverlayClick(event) {
      if (event.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, []);

  const handleRegister = (formValue) => {
    auth
      .register(formValue.password, formValue.email)
      .then(() => {
        setIsSuccess(true);
        setToolTipPopupOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsSuccess(false);
        setToolTipPopupOpen(true);
        console.log(err);
      });
  };

  const handleLogin = (formValue) => {
    auth
      .authorize(formValue.password, formValue.email)
      .then((res) => {
        setLoggedIn(true);
        setEmail(formValue.email);
        localStorage.setItem("token", res.token);
        api.setAuthorizationToken(res.token); // Устанавливаем токен авторизации
        navigate("/");
      })
      .catch((err) => {
        setIsSuccess(false);
        setToolTipPopupOpen(true);
      });
  };

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setPopupWithConfirmationOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setPopupWithConfirmationOpen(false);
    setImagePopupOpen(false);
    setToolTipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .editUserInfo(user)
      .then((user) => {
        setCurrentUser({ ...user, avatar: currentUser.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(user) {
    setIsLoading(true);
    api
      .updateAvatar(user)
      .then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar });
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    console.log("Owner ID:", card.owner);
    console.log("currentUser ID:", currentUser._id);
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    setIsLoading(true);
    const cardId = selectedCard._id;
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddCard(newCard) {
    setIsLoading(true);
    api
      .addCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    api.setAuthorizationToken(""); // Очистить токен авторизации
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                handleRegistration={handleRegister}
                setLoggedIn={setLoggedIn}
                setIsSuccess={setIsSuccess}
                setToolTipPopupOpen={setToolTipPopupOpen}
              />
            }
          />

          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={handleLogin}
                setEmail={setEmail}
                setIsSuccess={setIsSuccess}
                setErrorMessage={setErrorMessage}
                setToolTipPopupOpen={setToolTipPopupOpen}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}
              />
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <Footer isLoggedIn={isLoggedIn} />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText={!isLoading ? "Сохранить" : "Сохранение..."}
        />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText={!isLoading ? "Сохранить" : "Сохранение..."}
        />
        <AddPlacePopup
          onAddCard={handleAddCard}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText={!isLoading ? "Создать" : "Создание..."}
        />
        <PopupWithConfirmation
          onConfirmation={handleCardDelete}
          isOpen={isPopupWithConfirmationOpen}
          onClose={closeAllPopups}
          buttonText={!isLoading ? "Да" : "Удаление..."}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          errorMessage={errorMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
