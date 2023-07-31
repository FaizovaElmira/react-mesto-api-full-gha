class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this.baseUrl}cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  editUserInfo(data) {
    return fetch(`${this.baseUrl}users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this.baseUrl}cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.baseUrl}cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  updateAvatar(data) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: data.avatar }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65/",
  headers: {
    authorization: "5d4b4f2c-8537-45c3-b70b-2e2dac143126",
    "Content-Type": "application/json",
  },
});

export default api;
