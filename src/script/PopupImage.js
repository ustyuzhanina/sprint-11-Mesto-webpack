import {Popup} from "./Popup.js";

class PopupImage extends Popup {

  constructor(popup) {
    super(popup);
    this.domImage = this.popupElement.querySelector(".popup__image-content");
    this.insertImage = this.insertImage.bind(this);
  }

  insertImage(imageLink) {
    this.domImage.setAttribute("src", imageLink);
  }

}

export {PopupImage};
