'use strict';

class Popup {

  constructor(popup, onClose) {
    this.popupElement = popup;
    this.popupCloser = this.popupElement.querySelector(".popup__close"); // + Можно лучше: Опечатка, двойная точка с запятой.
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onClose = onClose;
  }

  open() {
    this.popupElement.classList.add("popup_is-opened");
    this.popupCloser.addEventListener("click", this.close);
  }

  close() {
    this.popupElement.classList.remove("popup_is-opened");

    if (this.onClose) this.onClose();

    this.popupCloser.removeEventListener("click", this.close);
  }



}







