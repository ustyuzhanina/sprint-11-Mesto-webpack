export class Card {

  constructor(cardElement, getPopupImage, api) {
    this.api = api;
    this._id = cardElement._id;
    this.name = cardElement.name;
    this.link = cardElement.link;
    this.likes = cardElement.likes;
    this.likeIcon = null;
    this.removeIcon = null;
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this.isLiked = false;
    this.newCard = null;
    this.getPopupImage = getPopupImage;
  }

  create() {
    const template = `
    <div class="place-card">
      <div class="place-card__image">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <button class="place-card__like-icon"></button>        
      </div>
    </div>
    `

    const element = document.createElement("div");
    element.insertAdjacentHTML("afterbegin", template.trim());

    this.newCard = element.firstChild;
    this.newCard.querySelector(".place-card__name").textContent = this.name;
    /*
      Можно лучше: Стоит воспользоваться шаблонными строками из es6,
      так код станет компактней и понятней.
      https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/template_strings
     */
    this.newCard.querySelector(".place-card__image").style.backgroundImage = "url(" + this.link + ")";

    this.setEventListeners();

    return this.newCard;

  }

  like() {
    /*
      Можно лучше: event не передан в функцию.
      Использование window.event считается нежелательным, так как может привести к трудноотлавливаемым багам.
      https://developer.mozilla.org/en-US/docs/Web/API/Window/event
     */
    event.stopPropagation();
    /*
      Можно лучше: Лучше использовать this.likeIcon, который предварительно проинициализировать в методе create.
     */
    this.newCard.querySelector(".place-card__like-icon").classList.toggle("place-card__like-icon_liked");
    this.isLiked = !this.isLiked;
  }

  remove(event) {
    event.stopPropagation();
    /*
      + Можно лучше: event не передан в функцию.
      Использование window.event считается нежелательным, так как может привести к трудноотлавливаемым багам.
      https://developer.mozilla.org/en-US/docs/Web/API/Window/event
     */  
    
    this.api.deleteCard(this).then(
      () => {
        this.removeEventListeners();
        this.newCard.remove();        
      })
      .catch(err => console.log(err));
  }

  setEventListeners() {
    /*
      Можно лучше: this.likeIcon лучше проинициализировать в методе create,
      чтобы затем использовать в setEventListeners, removeEventListeners и like.
     */
    this.likeIcon = this.newCard.querySelector(".place-card__like-icon");
    this.likeIcon.addEventListener("click", this.like);

    /*
	 Можно лучше: this.removeIcon лучше проинициализировать в методе create,
	 чтобы затем использовать в setEventListeners и removeEventListeners.
	*/
    this.removeIcon = this.newCard.querySelector(".place-card__delete-icon");
    this.removeIcon.addEventListener("click", this.remove);

    /*
	 Можно лучше: this.image лучше проинициализировать в методе create,
	 чтобы затем использовать в setEventListeners и removeEventListeners.
	*/
    this.image = this.newCard.querySelector(".place-card__image");
    this.image.addEventListener("click", this.getPopupImage);
  }

  removeEventListeners() {
    /*
      Можно лучше: this.likeIcon лучше проинициализировать в методе create,
      чтобы затем использовать в setEventListeners, removeEventListeners и like.
     */
    this.likeIcon = this.newCard.querySelector(".place-card__like-icon");
    this.likeIcon.removeEventListener("click", this.like);

    /*
	 Можно лучше: this.removeIcon лучше проинициализировать в методе create,
	 чтобы затем использовать в setEventListeners и removeEventListeners.
	*/
    this.removeIcon = this.newCard.querySelector(".place-card__delete-icon");
    this.removeIcon.removeEventListener("click", this.remove);

    /*
	 Можно лучше: this.image лучше проинициализировать в методе create,
	 чтобы затем использовать в setEventListeners и removeEventListeners.
	*/
    this.image = this.newCard.querySelector(".place-card__image");
    this.image.removeEventListener("click", this.getPopupImage);

  }

}
