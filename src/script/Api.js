export class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
    this._getResponseData = this._getResponseData.bind(this);
    this.addCard = this.addCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
    }

  getInitialCards(){
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })    
    .then(res => this._getResponseData(res))
  }

  addCard(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })
  .then(res => this._getResponseData(res))
  }

  /* Можно лучше: передавать id карточки, а не весь объект */
  deleteCard(card){ // TODO доработать по иконкам удаления и confirm
    return fetch(`${this.baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
  .then(res => this._getResponseData(res))
  }

  getUserData(){
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
  .then(res => this._getResponseData(res))
  }

  uploadUserInfo(data){
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
  .then(res => this._getResponseData(res))
  }
}

