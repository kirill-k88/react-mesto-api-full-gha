import { checkResponse } from './checkResponse';
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(checkResponse);
  }

  getInitialCards() {
    return this._request('/cards', { headers: this._headers });
  }

  getUserInfo() {
    return this._request('/users/me', { headers: this._headers });
  }

  modifyUserInfo(userObject) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userObject)
    });
  }

  sendNewCard(cardObject) {
    return this._request('/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardObject)
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  sendLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  deleteLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  modifyAvatar(avatarObj) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatarObj)
    });
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '5dc10575-faf8-4cb0-bf95-93ad59b5cd72',
    'Content-Type': 'application/json'
  }
});
