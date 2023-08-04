import { checkResponse } from './checkResponse';
class ApiAuth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(checkResponse);
  }

  checkToken() {
    return this._request('/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  authorize(password, email) {
    return this._request('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, email })
    });
  }

  register(password, email) {
    return this._request('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, email })
    });
  }
}

export const apiAuth = new ApiAuth({ baseUrl: 'https://auth.nomoreparties.co' });
