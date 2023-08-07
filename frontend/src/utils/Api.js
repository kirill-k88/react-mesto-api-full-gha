import { checkResponse } from './checkResponse';
class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(checkResponse);
  }
  _getHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    };
  }

  getInitialCards() {
    return this._request('/cards', { headers: this._getHeaders() });
  }

  getUserInfo() {
    return this._request('/users/me', { headers: this._getHeaders() });
  }

  modifyUserInfo(userObject) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(userObject)
    });
  }

  sendNewCard(cardObject) {
    return this._request('/cards', {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(cardObject)
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    });
  }

  sendLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._getHeaders()
    });
  }

  deleteLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders()
    });
  }

  modifyAvatar(avatarObj) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(avatarObj)
    });
  }
}

export const api = new Api(
  'https://api.supermesto.students.nomoreparties.co'
  /*   'http://localhost:4000' */
);
